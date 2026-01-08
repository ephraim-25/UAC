import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class CatalogService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    async findAll(filters: {
        categorySlug?: string;
        minPrice?: number;
        maxPrice?: number;
        search?: string;
    }) {
        const query = this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .where('product.isActive = :isActive', { isActive: true });

        if (filters.categorySlug) {
            query.andWhere('category.slug = :slug', { slug: filters.categorySlug });
        }

        if (filters.minPrice) {
            query.andWhere('product.price >= :minPrice', { minPrice: filters.minPrice });
        }

        if (filters.maxPrice) {
            query.andWhere('product.price <= :maxPrice', { maxPrice: filters.maxPrice });
        }

        if (filters.search) {
            query.andWhere(
                '(product.name ILIKE :search OR product.description ILIKE :search)',
                { search: `%${filters.search}%` },
            );
        }

        return query.getMany();
    }

    async findOneBySlug(slug: string) {
        const product = await this.productRepository.findOne({
            where: { slug, isActive: true },
            relations: ['category'],
        });

        if (!product) {
            throw new NotFoundException(`Product with slug ${slug} not found`);
        }

        return product;
    }

    async getCategories() {
        return this.categoryRepository.find({
            where: { parent: null }, // Fetch root categories only or use tree structure
            relations: ['children'],
        });
    }
}
