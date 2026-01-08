import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Order } from '../../order/entities/order.entity';

export enum PaymentProvider {
    MPESA = 'MPESA',
    ORANGE_MONEY = 'ORANGE_MONEY',
    AIRTEL_MONEY = 'AIRTEL_MONEY',
    STRIPE = 'STRIPE',
}

export enum TransactionStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order)
    order: Order;

    @Column({
        type: 'enum',
        enum: PaymentProvider,
    })
    provider: PaymentProvider;

    @Column({ nullable: true })
    providerTransactionId: string;

    @Column('decimal', { precision: 12, scale: 2 })
    amount: number;

    @Column({
        type: 'enum',
        enum: TransactionStatus,
        default: TransactionStatus.PENDING,
    })
    status: TransactionStatus;

    @Column({ type: 'jsonb', nullable: true })
    providerResponse: any;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
