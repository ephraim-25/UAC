import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
export declare class CatalogService {
    private readonly productRepository;
    private readonly categoryRepository;
    constructor(productRepository: Repository<Product>, categoryRepository: Repository<Category>);
    findAll(filters: {
        categorySlug?: string;
        minPrice?: number;
        maxPrice?: number;
        search?: string;
    }): Promise<Product[]>;
    findOneBySlug(slug: string): Promise<Product>;
    getCategories(): Promise<Category[]>;
}
