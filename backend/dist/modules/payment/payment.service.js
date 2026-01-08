"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("./entities/transaction.entity");
const order_service_1 = require("../order/order.service");
const order_entity_1 = require("../order/entities/order.entity");
let PaymentService = class PaymentService {
    constructor(transactionRepository, orderService) {
        this.transactionRepository = transactionRepository;
        this.orderService = orderService;
    }
    async initiatePayment(orderId, provider) {
        const order = await this.orderService.findOne(orderId);
        const transaction = this.transactionRepository.create({
            order: order,
            provider,
            amount: order.totalAmount,
            status: transaction_entity_1.TransactionStatus.PENDING,
        });
        const savedTransaction = await this.transactionRepository.save(transaction);
        let providerData = {};
        switch (provider) {
            case transaction_entity_1.PaymentProvider.MPESA:
                providerData = await this.initiateMpesa(savedTransaction);
                break;
            case transaction_entity_1.PaymentProvider.ORANGE_MONEY:
                providerData = await this.initiateOrangeMoney(savedTransaction);
                break;
            case transaction_entity_1.PaymentProvider.STRIPE:
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
    async initiateMpesa(transaction) {
        return {
            checkoutUrl: `https://api.vodacom.cd/mpesa/checkout/${transaction.id}`,
            instructions: 'Veuillez confirmer le paiement sur votre téléphone.',
        };
    }
    async initiateOrangeMoney(transaction) {
        return {
            checkoutUrl: `https://api.orange.cd/om/pay/${transaction.id}`,
            instructions: 'Recomposez le *144# pour valider.',
        };
    }
    async initiateStripe(transaction) {
        return {
            clientSecret: `pi_mock_secret_${transaction.id}`,
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
        };
    }
    async handleWebhook(provider, data) {
        const transactionId = data.referenceId || data.transactionId;
        const transaction = await this.transactionRepository.findOne({
            where: { id: transactionId },
            relations: ['order'],
        });
        if (!transaction)
            return;
        if (data.status === 'success') {
            transaction.status = transaction_entity_1.TransactionStatus.SUCCESS;
            transaction.providerTransactionId = data.externalId;
            await this.transactionRepository.save(transaction);
            await this.orderService.updateStatus(transaction.order.id, order_entity_1.OrderStatus.PAID);
        }
        else {
            transaction.status = transaction_entity_1.TransactionStatus.FAILED;
            await this.transactionRepository.save(transaction);
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => order_service_1.OrderService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        order_service_1.OrderService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map