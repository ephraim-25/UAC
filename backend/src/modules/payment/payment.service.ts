import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, PaymentProvider, TransactionStatus } from './entities/transaction.entity';
import { OrderService } from '../order/order.service';
import { OrderStatus } from '../order/entities/order.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        @Inject(forwardRef(() => OrderService))
        private readonly orderService: OrderService,
    ) { }

    async initiatePayment(orderId: string, provider: PaymentProvider) {
        const order = await this.orderService.findOne(orderId);

        const transaction = this.transactionRepository.create({
            order: order,
            provider,
            amount: order.totalAmount,
            status: TransactionStatus.PENDING,
        });

        const savedTransaction = await this.transactionRepository.save(transaction);

        // Orchestrate based on provider
        let providerData = {};
        switch (provider) {
            case PaymentProvider.MPESA:
                providerData = await this.initiateMpesa(savedTransaction);
                break;
            case PaymentProvider.ORANGE_MONEY:
                providerData = await this.initiateOrangeMoney(savedTransaction);
                break;
            case PaymentProvider.STRIPE:
                providerData = await this.initiateStripe(savedTransaction);
                break;
            default:
                throw new Error('Unsupported payment provider');
        }

        return {
            transactionId: savedTransaction.id,
            ...providerData,
        };
    }

    // Provider specific implementations (Mocks for now, placeholders for real APIs)
    private async initiateMpesa(transaction: Transaction) {
        // Logic to call Vodacom M-Pesa API
        return {
            checkoutUrl: `https://api.vodacom.cd/mpesa/checkout/${transaction.id}`,
            instructions: 'Veuillez confirmer le paiement sur votre téléphone.',
        };
    }

    private async initiateOrangeMoney(transaction: Transaction) {
        // Logic to call Orange Money API
        return {
            checkoutUrl: `https://api.orange.cd/om/pay/${transaction.id}`,
            instructions: 'Recomposez le *144# pour valider.',
        };
    }

    private async initiateStripe(transaction: Transaction) {
        // Logic to call Stripe (return client secret for frontend)
        return {
            clientSecret: `pi_mock_secret_${transaction.id}`,
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        };
    }

    async handleWebhook(provider: PaymentProvider, data: any) {
        // Logic to verify and update transaction status
        // This is where real status updates happen from provider callbacks
        const transactionId = data.referenceId || data.transactionId;
        const transaction = await this.transactionRepository.findOne({
            where: { id: transactionId },
            relations: ['order'],
        });

        if (!transaction) return;

        if (data.status === 'success') {
            transaction.status = TransactionStatus.SUCCESS;
            transaction.providerTransactionId = data.externalId;
            await this.transactionRepository.save(transaction);

            // Update linked order
            await this.orderService.updateStatus(transaction.order.id, OrderStatus.PAID);
        } else {
            transaction.status = TransactionStatus.FAILED;
            await this.transactionRepository.save(transaction);
        }
    }
}
