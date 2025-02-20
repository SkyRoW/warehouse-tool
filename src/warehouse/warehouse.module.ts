import { Module } from '@nestjs/common';
import { WarehouseController } from './controller/warehouse.controller';
import { WarehouseService } from './service/warehouse.service';
import { FlexiBeeModule } from 'src/flexibee/flexibee.module';
import { XmlModule } from 'src/xml/xml.module';

@Module({
  imports: [
    FlexiBeeModule,
    XmlModule,
  ],
  controllers: [WarehouseController],
  providers: [
    WarehouseService
  ],
})
export class WarehouseModule {}
