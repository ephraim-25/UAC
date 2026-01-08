"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./modules/catalog/entities/product.entity");
const category_entity_1 = require("./modules/catalog/entities/category.entity");
let SeedService = class SeedService {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    async onModuleInit() {
        await this.seed();
    }
    async seed() {
        const categoriesCount = await this.categoryRepository.count();
        if (categoriesCount > 0)
            return;
        console.log('Seeding UAC Data...');
        const it = this.categoryRepository.create({ name: 'Informatique', slug: 'it', description: 'Ordinateurs, tablettes et accessoires' });
        const furniture = this.categoryRepository.create({ name: 'Mobilier', slug: 'furniture', description: 'Meubles de maison et bureau' });
        const appliances = this.categoryRepository.create({ name: 'Électroménager', slug: 'appliances', description: 'Cuisine et maison' });
        const solar = this.categoryRepository.create({ name: 'Énergie Solaire', slug: 'solar', description: 'Panneaux et solutions solaires' });
        await this.categoryRepository.save([it, furniture, appliances, solar]);
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
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SeedService);
//# sourceMappingURL=seed.service.js.map