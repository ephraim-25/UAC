import { Product } from '../../catalog/entities/product.entity';
export declare enum OrderStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}
export declare class Order {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    totalAmount: number;
    status: OrderStatus;
    paymentMethod: string;
    createdAt: Date;
    updatedAt: Date;
    items: OrderItem[];
}
export declare class OrderItem {
    id: string;
    order: Order;
    product: Product;
    quantity: number;
    priceAtPurchase: number;
}
