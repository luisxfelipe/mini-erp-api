import { Module } from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrdersController } from './purchase-orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrderStatus } from './purchase-order-status/entities/purchase-order-status.entity';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { PurchaseOrderStatusService } from './purchase-order-status/purchase-order-status.service';
import { PurchaseOrderStatusController } from './purchase-order-status/purchase-order-status.controller';
import { SuppliersModule } from 'src/suppliers/suppliers.module';
import { PurchaseOrderItemsController } from './purchase-order-items/purchase-order-items.controller';
import { PurchaseOrderItemsService } from './purchase-order-items/purchase-order-items.service';
import { PurchaseOrderItem } from './purchase-order-items/entities/purchase-order-item.entity';
import { ProductsModule } from 'src/products/products.module';
import { PurchaseOrderRefund } from './purchase-order-refunds/entities/purchase-order-refund.entity';
import { PurchaseOrderRefundsController } from './purchase-order-refunds/purchase-order-refunds.controller';
import { PurchaseOrderRefundsService } from './purchase-order-refunds/purchase-order-refunds.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseOrder,
      PurchaseOrderItem,
      PurchaseOrderRefund,
      PurchaseOrderStatus,
    ]),
    ProductsModule,
    SuppliersModule,
  ],
  controllers: [
    PurchaseOrdersController,
    PurchaseOrderItemsController,
    PurchaseOrderRefundsController,
    PurchaseOrderStatusController,
  ],
  providers: [
    PurchaseOrdersService,
    PurchaseOrderItemsService,
    PurchaseOrderRefundsService,
    PurchaseOrderStatusService,
  ],
})
export class PurchaseOrdersModule {}
