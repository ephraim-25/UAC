import { Controller, Get, Query, Param } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) { }

    @Get('products')
    async getProducts(
        @Query('category') categorySlug?: string,
        @Query('minPrice') minPrice?: string,
        @Query('maxPrice') maxPrice?: string,
        @Query('search') search?: string,
    ) {
        return this.catalogService.findAll({
            categorySlug,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
            search,
        });
    }

    @Get('products/:slug')
    async getProduct(@Param('slug') slug: string) {
        return this.catalogService.findOneBySlug(slug);
    }

    @Get('categories')
    async getCategories() {
        return this.catalogService.getCategories();
    }
}
