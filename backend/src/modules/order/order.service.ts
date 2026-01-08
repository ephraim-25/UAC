import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderItem, OrderStatus } from './entities/order.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>,
    ) { }

    async create(orderData: {
        customerName: string;
        customerEmail?: string;
        customerPhone?: string;
        items: { productId: string; quantity: number; price: number }[];
        paymentMethod?: string;
    }) {
        const totalAmount = orderData.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
        );

        const order = this.orderRepository.create({
            customerName: orderData.customerName,
            customerEmail: orderData.customerEmail,
            customerPhone: orderData.customerPhone,
            totalAmount,
            paymentMethod: orderData.paymentMethod,
            status: OrderStatus.PENDING,
        });

        const savedOrder = await this.orderRepository.save(order);

        const orderItems = orderData.items.map((item) =>
            this.orderItemRepository.create({
                order: savedOrder,
                product: { id: item.productId } as any,
                quantity: item.quantity,
                priceAtPurchase: item.price,
            }),
        );

        await this.orderItemRepository.save(orderItems);

        return this.findOne(savedOrder.id);
    }

    async findOne(id: string) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['items', 'items.product'],
        });

        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }

        return order;
    }

    async updateStatus(id: string, status: OrderStatus) {
        await this.orderRepository.update(id, { status });
        return this.findOne(id);
    }
}
