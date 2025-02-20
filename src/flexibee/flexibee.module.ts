import { Module } from '@nestjs/common';
import { FlexiBeeService } from './service/flexibee.service';
import { FlexiBeeHttpService } from './service/flexibee-http.service';
import { FlexiBeeMapperService } from './service/flexibee-mapper.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    FlexiBeeService,
    FlexiBeeHttpService,
    FlexiBeeMapperService,
  ],
  exports: [
    FlexiBeeService,
  ]
})
export class FlexiBeeModule {}
