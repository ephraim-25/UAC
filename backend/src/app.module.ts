import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './modules/catalog/catalog.module';
import { OrderModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';
import { SeedService } from './seed.service';
import { Product } from './modules/catalog/entities/product.entity';
import { Category } from './modules/catalog/entities/category.entity';
import { Order, OrderItem } from './modules/order/entities/order.entity';
import { Transaction } from './modules/payment/entities/transaction.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST', 'localhost'),
                port: configService.get<number>('DB_PORT', 5432),
                username: configService.get<string>('DB_USERNAME', 'uac_admin'),
                password: configService.get<string>('DB_PASSWORD', 'uac_password_secure'),
                database: configService.get<string>('DB_DATABASE', 'uac_ecommerce'),
                autoLoadEntities: true,
                synchronize: true,
            }),
        }),
        TypeOrmModule.forFeature([Product, Category, Order, OrderItem, Transaction]),
        CatalogModule,
        OrderModule,
        PaymentModule,
    ],
    controllers: [AppController],
    providers: [AppService, SeedService],
})
export class AppModule { }
