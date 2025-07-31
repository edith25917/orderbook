import useOrderBookStore from '@/stores/useOrderBookStore'
import styles from './index.module.scss'
import cn from 'classnames'
import { EOrderMode } from '../types'
import QuoteRow from '../quoteRow'
import IconArrow from '@/components/common/icon/IconArrow'

const VIEW_ROWS = 8


export default function QuoteTable() {
    const buyQuotes = useOrderBookStore(state => state.buyQuotes)
    const sellQuotes = useOrderBookStore(state => state.sellQuotes)
    const lastPrice = useOrderBookStore(state => state.lastPrice)
    const prevPrice = useOrderBookStore(state => state.prevPrice)

    const isLoading = buyQuotes.length <= 0 && sellQuotes.length <= 0
    const currentSellQuotes = sellQuotes.slice(0, VIEW_ROWS).reverse()
    const currentBuyQuotes = buyQuotes.slice(0, VIEW_ROWS)

    const getPriceDisplayMeta = () => {
        if (!prevPrice || lastPrice === prevPrice) {
            return {
                arrowColor: 'var(--price-same)',
                arrowClass: styles.lastPriceIconHide,
                lastPriceClass: styles.same,
            };
        }
        if (lastPrice > prevPrice) {
            return {
                arrowColor: 'var(--price-up)',
                arrowClass: styles.lastPriceIconUp,
                lastPriceClass: styles.up,
            };
        }
        return {
            arrowColor: 'var(--price-down)',
            lastPriceClass: styles.down,
        };
    };

    const lastPriceMeta = getPriceDisplayMeta()


    return (
        <>
            {!isLoading ? <div className={styles.orderBook}>
                <div className={styles.header}>
                    <span className={styles.headerItem}>Price (USD)</span>
                    <span className={cn(styles.headerItem, styles.headerItemEnd)}>Size</span>
                    <span className={cn(styles.headerItem, styles.headerItemEnd)}>Total</span>
                </div>
                <div className={cn(styles.quotes, styles.sellQuotes)}>
                    {currentSellQuotes.map((q) => <QuoteRow key={q.price} quote={q} orderMode={EOrderMode.SELL} totalSize={sellQuotes.at(-1)?.total} />)}
                </div>
                <div className={cn(styles.lastPrice, lastPriceMeta.lastPriceClass)}>
                    {lastPrice.toLocaleString()}
                    <div className={cn(styles.lastPriceIcon, lastPriceMeta.arrowClass && lastPriceMeta.arrowClass)}>
                        <IconArrow color={lastPriceMeta.arrowColor} size={20} />
                    </div>
                </div>
                <div className={cn(styles.quotes, styles.buyQuotes)}>
                    {currentBuyQuotes.map((q) => <QuoteRow key={q.price} quote={q} orderMode={EOrderMode.BUY} totalSize={buyQuotes.at(-1)?.total} />)}
                </div>
            </div > : null}
        </>
    );
}