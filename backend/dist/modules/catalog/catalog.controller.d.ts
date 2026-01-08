import { CatalogService } from './catalog.service';
export declare class CatalogController {
    private readonly catalogService;
    constructor(catalogService: CatalogService);
    getProducts(categorySlug?: string, minPrice?: string, maxPrice?: string, search?: string): Promise<import("./entities/product.entity").Product[]>;
    getProduct(slug: string): Promise<import("./entities/product.entity").Product>;
    getCategories(): Promise<import("./entities/category.entity").Category[]>;
}
