"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const catalog_module_1 = require("./modules/catalog/catalog.module");
const order_module_1 = require("./modules/order/order.module");
const payment_module_1 = require("./modules/payment/payment.module");
const seed_service_1 = require("./seed.service");
const product_entity_1 = require("./modules/catalog/entities/product.entity");
const category_entity_1 = require("./modules/catalog/entities/category.entity");
const order_entity_1 = require("./modules/order/entities/order.entity");
const transaction_entity_1 = require("./modules/payment/entities/transaction.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 5432),
                    username: configService.get('DB_USERNAME', 'uac_admin'),
                    password: configService.get('DB_PASSWORD', 'uac_password_secure'),
                    database: configService.get('DB_DATABASE', 'uac_ecommerce'),
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, category_entity_1.Category, order_entity_1.Order, order_entity_1.OrderItem, transaction_entity_1.Transaction]),
            catalog_module_1.CatalogModule,
            order_module_1.OrderModule,
            payment_module_1.PaymentModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, seed_service_1.SeedService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map