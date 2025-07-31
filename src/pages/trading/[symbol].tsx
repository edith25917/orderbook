import { useEffect } from 'react'
import useOrderBookStore from '@/stores/useOrderBookStore'
import OrderBookTable from '@/components/orderBook/quoteTable'
import styles from './index.module.scss'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

const getSymbolFromRouter = (query: ParsedUrlQuery): string => {
    const raw = query.symbol || '';
    const symbol = Array.isArray(raw) ? raw[0] : raw;
    return symbol?.replace('_', '') || '';
};

export default function Trading() {
    const router = useRouter()
    const symbol = getSymbolFromRouter(router.query)
    const connectOrderBook = useOrderBookStore(state => state.connectOrderBook)
    const connectTradeHistory = useOrderBookStore(state => state.connectTradeHistory)

    useEffect(() => {
        if (!symbol) return
        const disconnectOrder = connectOrderBook(symbol)
        const disconnectHistory = connectTradeHistory(symbol)
        return () => {
            disconnectOrder?.()
            disconnectHistory?.()
        }
    }, [symbol])

    return (
        <div className={styles.wrapper}>
            <OrderBookTable />
        </div>
    )
}