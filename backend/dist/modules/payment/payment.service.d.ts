import { Repository } from 'typeorm';
import { Transaction, PaymentProvider } from './entities/transaction.entity';
import { OrderService } from '../order/order.service';
export declare class PaymentService {
    private readonly transactionRepository;
    private readonly orderService;
    constructor(transactionRepository: Repository<Transaction>, orderService: OrderService);
    initiatePayment(orderId: string, provider: PaymentProvider): Promise<{
        transactionId: string;
    }>;
    private initiateMpesa;
    private initiateOrangeMoney;
    private initiateStripe;
    handleWebhook(provider: PaymentProvider, data: any): Promise<void>;
}
