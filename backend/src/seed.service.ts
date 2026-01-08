import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './modules/catalog/entities/product.entity';
import { Category } from './modules/catalog/entities/category.entity';

@Injectable()
export class SeedService implements OnModuleInit {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    async onModuleInit() {
        await this.seed();
    }

    async seed() {
        const categoriesCount = await this.categoryRepository.count();
        if (categoriesCount > 0) return; // Déjà peuplé

        console.log('Seeding UAC Data...');

        // Categories
        const it = this.categoryRepository.create({ name: 'Informatique', slug: 'it', description: 'Ordinateurs, tablettes et accessoires' });
        const furniture = this.categoryRepository.create({ name: 'Mobilier', slug: 'furniture', description: 'Meubles de maison et bureau' });
        const appliances = this.categoryRepository.create({ name: 'Électroménager', slug: 'appliances', description: 'Cuisine et maison' });
        const solar = this.categoryRepository.create({ name: 'Énergie Solaire', slug: 'solar', description: 'Panneaux et solutions solaires' });

        await this.categoryRepository.save([it, furniture, appliances, solar]);

        // Products
        const products = [
            {
                name: 'Samsung Galaxy Book Ultra',
                slug: 'samsung-galaxy-book-ultra',
                description: 'Le summum de la puissance IT pour les professionnels.',
                price: 1899.99,
                stockQuantity: 15,
                category: it,
                attributes: { ram: '32GB', storage: '1TB SSD', processor: 'Intel i9' },
                images: ['https://images.samsung.com/is/image/samsung/p6pim/fr/np960xfh-xa1fr/gallery/fr-galaxy-book3-ultra-np960-449439-np960xfh-xa1fr-535123910']
            },
            {
                name: 'Canapé Royal Velvet Blue',
                slug: 'canape-royal-velvet-blue',
                description: 'Confort et élégance pour votre salon.',
                price: 850.00,
                stockQuantity: 5,
                category: furniture,
                attributes: { material: 'Velours', color: 'UAC Blue' },
                images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop']
            },
            {
                name: 'Réfrigérateur Samsung Side-by-Side',
                slug: 'samsung-ref-side-by-side',
                description: 'Capacité XXL et technologie No-Frost.',
                price: 1450.00,
                stockQuantity: 8,
                category: appliances,
                attributes: { capacity: '650L', energy: 'A++' },
                images: ['https://images.samsung.com/is/image/samsung/p6pim/fr/rs68a8840sl-ef/gallery/fr-side-by-side-rs68a8840sl-ef-398705353']
            }
        ];

        for (const prodData of products) {
            const product = this.productRepository.create(prodData);
            await this.productRepository.save(product);
        }

        console.log('Seeding completed successfully.');
    }
}
