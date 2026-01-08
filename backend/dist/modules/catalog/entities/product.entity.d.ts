import { Category } from './category.entity';
export declare class Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    stockQuantity: number;
    attributes: Record<string, any>;
    images: string[];
    category: Category;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
