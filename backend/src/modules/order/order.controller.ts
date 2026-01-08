import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    async createOrder(@Body() orderData: any) {
        return this.orderService.create(orderData);
    }

    @Get(':id')
    async getOrder(@Param('id') id: string) {
        return this.orderService.findOne(id);
    }
}
