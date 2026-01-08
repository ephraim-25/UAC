import { Controller, Post, Body, Param, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentProvider } from './entities/transaction.entity';

@Controller('payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post('initiate/:orderId')
    async initiatePayment(
        @Param('orderId') orderId: string,
        @Body('provider') provider: PaymentProvider,
    ) {
        return this.paymentService.initiatePayment(orderId, provider);
    }

    @Post('webhook/:provider')
    async handleWebhook(
        @Param('provider') provider: PaymentProvider,
        @Body() body: any,
    ) {
        return this.paymentService.handleWebhook(provider, body);
    }
}
