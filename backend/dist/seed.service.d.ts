import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './modules/catalog/entities/product.entity';
import { Category } from './modules/catalog/entities/category.entity';
export declare class SeedService implements OnModuleInit {
    private readonly productRepository;
    private readonly categoryRepository;
    constructor(productRepository: Repository<Product>, categoryRepository: Repository<Category>);
    onModuleInit(): Promise<void>;
    seed(): Promise<void>;
}
