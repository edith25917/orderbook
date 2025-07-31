export enum EOrderMode {
    SELL = "SELL",
    BUY = "BUY"
}

export enum EQuoteSizeDirection {
    UP = 'UP',
    DOWN = 'DOWN',
}

export interface Quote {
    price: number;
    size: number;
    total: number;
    isNewQuote?: boolean;
    sizeChange: EQuoteSizeDirection | null;
}
