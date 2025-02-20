import { Module } from '@nestjs/common';
import { WarehouseModule } from './warehouse/warehouse.module';

@Module({
  imports: [WarehouseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
