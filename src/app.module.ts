import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from './products/products.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { PurchaseOrdersModule } from './purchase-orders/purchase-orders.module';
import { SaleOrdersModule } from './sale-orders/sale-orders.module';
import { StockItemsModule } from './stock-items/stock-items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST', process.env.MYSQL_HOST),
        port: parseInt(
          configService.get<string>('MYSQL_PORT', process.env.MYSQL_PORT),
          10,
        ),
        username: configService.get<string>(
          'MYSQL_USER',
          process.env.MYSQL_USER,
        ),
        password: configService.get<string>(
          'MYSQL_PASSWORD',
          process.env.MYSQL_PASSWORD,
        ),
        database: configService.get<string>(
          'MYSQL_DATABASE',
          process.env.MYSQL_DATABASE,
        ),
        entities: [__dirname + configService.get('MYSQL_ENTITIES')] || [
          __dirname + process.env.MYSQL_ENTITIES,
        ],
        autoLoadEntities:
          Boolean(
            Number(configService.get<boolean>('MYSQL_AUTO_LOAD_ENTITIES')),
          ) || Boolean(Number(process.env.MYSQL_AUTO_LOAD_ENTITIES)),
        synchronize:
          Boolean(Number(configService.get<boolean>('MYSQL_SYNCHRONIZE'))) ||
          Boolean(Number(process.env.MYSQL_SYNCHRONIZE)),
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        migrationsRun: Boolean(
          Number(configService.get<boolean>('DB_MIGRATIONS_RUN')),
        ),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    JwtModule,
    UsersModule,
    ProductsModule,
    SuppliersModule,
    PurchaseOrdersModule,
    SaleOrdersModule,
    StockItemsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
