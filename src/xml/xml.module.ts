import { Module } from '@nestjs/common';
import { XmlService } from './service/xml.service';

@Module({
  imports: [],
  controllers: [],
  providers: [XmlService],
  exports: [XmlService]
})
export class XmlModule {}
