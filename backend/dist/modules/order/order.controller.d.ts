import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(orderData: any): Promise<import("./entities/order.entity").Order>;
    getOrder(id: string): Promise<import("./entities/order.entity").Order>;
}
