import { EQuoteSizeDirection, Quote } from './types';

export const parseQuotes = (entries: string[][]): Quote[] => {
    return entries.map(([p, s]) => ({
        price: parseFloat(p),
        size: parseFloat(s),
        total: 0,
        isNewQuote: false,
        sizeChange: null
    }));
};

export const mergeQuotes = (base: Quote[], updated: Quote[]): Quote[] => {
    const updatedMap = new Map(updated.map(q => [q.price, q]));
    const baseMap = new Map(base.map(q => [q.price, q]));

    for (const q of updated) {
        if (q.size === 0) {
            updatedMap.delete(q.price);
            baseMap.delete(q.price);
        }
    }

    for (const [price, quote] of baseMap) {
        if (!updatedMap.has(price)) {
            updatedMap.set(price, quote);
        }
    }

    return Array.from(updatedMap.values());
};


export const computeQuoteTotal = (quotes: Quote[], ascending: boolean): Quote[] => {
    let total = 0;
    const sorted = [...quotes].sort((a, b) => ascending ? a.price - b.price : b.price - a.price);

    return sorted.map(q => {
        total += q.size;
        return { ...q, total };
    });
};

export const resetQuoteDifference = (quotes: Quote[]): Quote[] => {
    return quotes.map(q => ({ ...q, isNewQuote: false, sizeChange: null }));
};

export const computeQuoteDifferences = (current: Quote[], changes: Quote[]): Quote[] => {
    const currentQuotes = resetQuoteDifference(current)
    const currentMap = new Map(currentQuotes.map(q => [q.price, q]));
    return changes.map(q => {
        const existing = currentMap.get(q.price);
        let sizeChange = null;
        if (existing) {
            if (q.size > existing.size) sizeChange = EQuoteSizeDirection.UP;
            else if (q.size < existing.size) sizeChange = EQuoteSizeDirection.DOWN;
        }
        return {
            ...q,
            isNewQuote: !currentMap.has(q.price),
            sizeChange,
        };
    });
};


export const processOrderBookUpdate = ({ rawData, currentQuotes, ascending }: {
    rawData: string[][],
    currentQuotes: Quote[],
    ascending: boolean
}
): Quote[] => {
    const parsed = parseQuotes(rawData);
    const merged = mergeQuotes(currentQuotes, parsed);
    const withTotal = computeQuoteTotal(merged, ascending);
    return withTotal;
};
