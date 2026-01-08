import { Product } from './product.entity';
export declare class Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    parent: Category;
    children: Category[];
    products: Product[];
}
