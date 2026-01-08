import { PaymentService } from './payment.service';
import { PaymentProvider } from './entities/transaction.entity';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    initiatePayment(orderId: string, provider: PaymentProvider): Promise<{
        transactionId: string;
    }>;
    handleWebhook(provider: PaymentProvider, body: any): Promise<void>;
}
