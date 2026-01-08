import { Repository } from 'typeorm';
import { Order, OrderItem, OrderStatus } from './entities/order.entity';
export declare class OrderService {
    private readonly orderRepository;
    private readonly orderItemRepository;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>);
    create(orderData: {
        customerName: string;
        customerEmail?: string;
        customerPhone?: string;
        items: {
            productId: string;
            quantity: number;
            price: number;
        }[];
        paymentMethod?: string;
    }): Promise<Order>;
    findOne(id: string): Promise<Order>;
    updateStatus(id: string, status: OrderStatus): Promise<Order>;
}
