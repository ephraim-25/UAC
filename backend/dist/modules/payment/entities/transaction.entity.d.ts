import { Order } from '../../order/entities/order.entity';
export declare enum PaymentProvider {
    MPESA = "MPESA",
    ORANGE_MONEY = "ORANGE_MONEY",
    AIRTEL_MONEY = "AIRTEL_MONEY",
    STRIPE = "STRIPE"
}
export declare enum TransactionStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}
export declare class Transaction {
    id: string;
    order: Order;
    provider: PaymentProvider;
    providerTransactionId: string;
    amount: number;
    status: TransactionStatus;
    providerResponse: any;
    createdAt: Date;
    updatedAt: Date;
}
