import { Quote } from '@/components/orderBook/types';
import { computeQuoteTotal, parseQuotes, processOrderBookUpdate, computeQuoteDifferences } from '@/components/orderBook/util';
import { create } from 'zustand';


interface OrderBookState {
    buyQuotes: Quote[];
    sellQuotes: Quote[];
    lastPrice: number;
    prevPrice: number;
}

interface OrderBookStore extends OrderBookState {
    connectOrderBook: (symbol: string) => () => void;
    connectTradeHistory: (symbol: string) => () => void;
}

const initialState: OrderBookState = {
    buyQuotes: [],
    sellQuotes: [],
    lastPrice: 0,
    prevPrice: 0,
}

const UPDATE_FREQUENCY_MS = 100


const useOrderBookStore = create<OrderBookStore>((set, get) => ({
    ...initialState,
    connectTradeHistory: (symbol: string) => {
        const topic = `tradeHistoryApi:${symbol}`
        const ws = new WebSocket('wss://ws.btse.com/ws/futures');
        ws.onopen = () => ws.send(JSON.stringify({ op: 'subscribe', args: [topic] }));

        ws.onmessage = (msg) => {
            const res = JSON.parse(msg.data);
            const trades = res?.data;
            if (Array.isArray(trades) && trades.length > 0) {
                const newPrice = trades[0].price;
                set((state) => ({
                    prevPrice: state.lastPrice,
                    lastPrice: newPrice,
                }));
            }
        };
        return () => ws.close();
    },
    connectOrderBook: (symbol: string) => {
        const topic = `update:${symbol}`;
        const ws = new WebSocket('wss://ws.btse.com/ws/oss/futures');
        ws.onopen = () => ws.send(JSON.stringify({ op: 'subscribe', args: [topic] }));

        let lastSeqNum: number | null = null;

        let latestQuotes = {
            buyQuotes: [] as Quote[],
            sellQuotes: [] as Quote[],
        };


        // batch update
        const flushInterval = setInterval(() => {
            if (get().buyQuotes.length && get().sellQuotes.length) {
                const diffBids = computeQuoteDifferences(get().buyQuotes, latestQuotes.buyQuotes)
                const diffAsks = computeQuoteDifferences(get().sellQuotes, latestQuotes.sellQuotes)
                set({ buyQuotes: diffBids, sellQuotes: diffAsks })
            }
        }, UPDATE_FREQUENCY_MS);

        ws.onmessage = (msg) => {
            try {
                const parsed = JSON.parse(msg.data);
                const data = parsed.data;
                if (!data) return;
                const { type, seqNum, prevSeqNum, bids, asks } = data;

                // resubscribe
                const isDelta = type === 'delta';
                const isSnapshot = type === 'snapshot';

                const isOutOfOrder = isDelta && lastSeqNum !== null && prevSeqNum !== lastSeqNum;
                const bestBid = latestQuotes.buyQuotes[0]?.price;
                const bestAsk = latestQuotes.sellQuotes[0]?.price;
                const isCrossedOrderBook = bestBid !== undefined && bestAsk !== undefined && bestBid >= bestAsk;
                const shouldResubscribe = isOutOfOrder || isCrossedOrderBook;

                if (shouldResubscribe) {
                    ws.send(JSON.stringify({ op: 'unsubscribe', args: [topic] }));
                    ws.send(JSON.stringify({ op: 'subscribe', args: [topic] }));
                    lastSeqNum = null;
                    return;
                }

                lastSeqNum = seqNum;

                // process data
                if (isSnapshot) {
                    const buy = computeQuoteTotal(parseQuotes(bids), false);
                    const sell = computeQuoteTotal(parseQuotes(asks), true);
                    latestQuotes.buyQuotes = buy
                    latestQuotes.sellQuotes = sell
                    set({ buyQuotes: buy, sellQuotes: sell });
                } else if (isDelta) {

                    const newBids = processOrderBookUpdate({ rawData: bids, currentQuotes: latestQuotes.buyQuotes, ascending: false })
                    const newAsks = processOrderBookUpdate({ rawData: asks, currentQuotes: latestQuotes.sellQuotes, ascending: true })
                    latestQuotes.buyQuotes = newBids;
                    latestQuotes.sellQuotes = newAsks;
                }
            } catch (e) {
                console.log('error in orderbook:', e, JSON.stringify(msg))
            }
        };
        return () => {
            clearInterval(flushInterval);
            ws.close();
        };
    },
}));

export default useOrderBookStore;