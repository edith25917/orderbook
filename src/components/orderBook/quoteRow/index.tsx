import { memo } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';
import { EOrderMode, EQuoteSizeDirection, Quote } from '../types';

interface Props {
    quote: Quote;
    orderMode: EOrderMode;
    totalSize?: number
}

const quoteAnimationClassMap = {
    quoteBar: {
        [EOrderMode.SELL]: styles.quoteBarSell,
        [EOrderMode.BUY]: styles.quoteBarBuy,
    },
    quotePirce: {
        [EOrderMode.SELL]: styles.quotePriceSell,
        [EOrderMode.BUY]: styles.quotePriceBuy,
    },
    quoteNew: {
        [EOrderMode.SELL]: styles.highlightDown,
        [EOrderMode.BUY]: styles.highlightUp,
    },
    quoteSize: {
        [EQuoteSizeDirection.UP]: styles.highlightUp,
        [EQuoteSizeDirection.DOWN]: styles.highlightDown,
    }
}

const QuoteRow = ({ quote, orderMode, totalSize = 1 }: Props) => {
    const rowHighlightClass = quote.isNewQuote ? quoteAnimationClassMap.quoteNew[orderMode] : ''
    const sizeHightlightClass = quote.sizeChange ? quoteAnimationClassMap.quoteSize[quote.sizeChange] : ''
    const barWidthPercent = Math.min((quote.total / totalSize) * 100, 100);
    const barStyle = { width: `${barWidthPercent}%` };

    return (
        <div className={cn(styles.quote, styles.highlight, rowHighlightClass, quote.isNewQuote && styles.highlightFlash)}>
            <div className={cn(styles.quotePrice, quoteAnimationClassMap.quotePirce[orderMode])}>{quote.price.toLocaleString()}</div>
            <div className={cn(styles.quoteSize, styles.highlight, sizeHightlightClass, quote.sizeChange && styles.highlightFlash)}>{quote.size.toLocaleString()}</div>
            <div className={styles.quoteTotal}>{quote.total.toLocaleString()}</div>
            <div className={cn(styles.quoteBar, quoteAnimationClassMap.quoteBar[orderMode])} style={barStyle} />
        </div>
    );
}

export default memo(QuoteRow, (prev, next) => {
    const q1 = prev.quote;
    const q2 = next.quote;

    return (
        q1.price === q2.price &&
        q1.size === q2.size &&
        q1.total === q2.total &&
        q1.sizeChange === q2.sizeChange &&
        q1.isNewQuote === q2.isNewQuote &&
        prev.orderMode === next.orderMode &&
        prev.totalSize === next.totalSize
    );
});
