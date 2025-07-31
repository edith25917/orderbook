import {
    parseQuotes,
    resetQuoteDifference,
    computeQuoteTotal,
    computeQuoteDifferences,
    mergeQuotes
} from '../util';
import { EQuoteSizeDirection, Quote } from '../types';

describe('utils.ts', () => {
    test('parseQuotes should parse strings to Quote[]', () => {
        const input = [['100', '2'], ['101', '3'], ['10222.234', '0']];
        const result = parseQuotes(input);
        expect(result).toEqual([
            { price: 100, size: 2, total: 0, isNewQuote: false, sizeChange: null },
            { price: 101, size: 3, total: 0, isNewQuote: false, sizeChange: null },
            { price: 10222.234, size: 0, total: 0, isNewQuote: false, sizeChange: null }
        ]);
    });

    test('resetQuoteDifference should clear isNewQuote and sizeChange', () => {
        const input: Quote[] = [
            { price: 100, size: 1, total: 1, isNewQuote: true, sizeChange: EQuoteSizeDirection.UP },
            { price: 101, size: 2, total: 3, isNewQuote: false, sizeChange: null }
        ];
        const result = resetQuoteDifference(input);
        expect(result).toEqual([
            { price: 100, size: 1, total: 1, isNewQuote: false, sizeChange: null },
            { price: 101, size: 2, total: 3, isNewQuote: false, sizeChange: null }
        ]);
    });

    test('computeQuoteTotal should sort and accumulate totals ascending', () => {
        const input: Quote[] = [
            { price: 102, size: 500, total: 0, isNewQuote: false, sizeChange: null },
            { price: 100, size: 600, total: 0, isNewQuote: false, sizeChange: null },
        ];
        const result = computeQuoteTotal(input, true);
        expect(result).toEqual([
            { price: 100, size: 600, total: 600, isNewQuote: false, sizeChange: null },
            { price: 102, size: 500, total: 1100, isNewQuote: false, sizeChange: null }
        ]);
    });

    test('computeQuoteTotal should sort and accumulate totals descending', () => {
        const input: Quote[] = [
            { price: 100, size: 600, total: 0, isNewQuote: false, sizeChange: null },
            { price: 102, size: 500, total: 0, isNewQuote: false, sizeChange: null },
        ];
        const result = computeQuoteTotal(input, false);
        expect(result).toEqual([
            { price: 102, size: 500, total: 500, isNewQuote: false, sizeChange: null },
            { price: 100, size: 600, total: 1100, isNewQuote: false, sizeChange: null }
        ]);
    });

    test('computeQuoteDifferences should flag isNewQuote and sizeChange correctly', () => {
        const current: Quote[] = [
            { price: 100, size: 2, total: 0, isNewQuote: false, sizeChange: null },
            { price: 101, size: 3, total: 0, isNewQuote: false, sizeChange: null }
        ];
        const changes: Quote[] = [
            { price: 100, size: 3, total: 0, isNewQuote: false, sizeChange: null },
            { price: 102, size: 1, total: 0, isNewQuote: false, sizeChange: null }
        ];
        const result = computeQuoteDifferences(current, changes);
        expect(result).toEqual([
            { price: 100, size: 3, total: 0, isNewQuote: false, sizeChange: EQuoteSizeDirection.UP },
            { price: 102, size: 1, total: 0, isNewQuote: true, sizeChange: null }
        ]);
    });
});

const test1 = [
    {
        "price": 118700.1,
        "size": 353956,
        "total": 353956,
        "isNewQuote": false,
        "sizeChange": null
    },
]

const test2 = [
    {
        "price": 118700.1,
        "size": 353956,
        "total": 353956,
        "isNewQuote": true,
        "sizeChange": null
    },
]

describe('mergeQuotes', () => {
    const baseQuotes: Quote[] = [
        { price: 100, size: 1, total: 0, isNewQuote: false, sizeChange: null },
        { price: 99, size: 2, total: 0, isNewQuote: false, sizeChange: null },
        { price: 98, size: 3, total: 0, isNewQuote: false, sizeChange: null },
    ];

    const updatedQuotes: Quote[] = [
        { price: 100, size: 2, total: 0, isNewQuote: true, sizeChange: EQuoteSizeDirection.UP },
        { price: 97, size: 1, total: 0, isNewQuote: true, sizeChange: null },
    ];

    it('should overwrite existing quote and merge new ones', () => {
        const result = mergeQuotes(baseQuotes, updatedQuotes);
        expect(result).toEqual([
            { price: 100, size: 2, total: 0, isNewQuote: true, sizeChange: EQuoteSizeDirection.UP },
            { price: 97, size: 1, total: 0, isNewQuote: true, sizeChange: null },
            { price: 99, size: 2, total: 0, isNewQuote: false, sizeChange: null },
            { price: 98, size: 3, total: 0, isNewQuote: false, sizeChange: null },
        ]);
    });

    it('should preserve all base quotes if updated is empty', () => {
        const result = mergeQuotes(baseQuotes, []);
        expect(result).toEqual(baseQuotes);
    });

    it('should return updated quotes if base is empty', () => {
        const result = mergeQuotes([], updatedQuotes);
        expect(result).toEqual(updatedQuotes);
    });
});

