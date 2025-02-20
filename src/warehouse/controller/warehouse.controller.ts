import { Controller, Get, Header, Query, Res } from '@nestjs/common';
import { WarehouseService } from '../service/warehouse.service';
import { Response } from 'express';
import { GetItemsQuery } from '../model/get-items.query';

@Controller('warehouse')
export class WarehouseController {
    private pageSize = 1000; 

    constructor(
        private readonly warehouseService: WarehouseService
    ) {}

    @Get('items')
    @Header('Content-Type', 'application/xml')
    async getItems(
        @Res() response: Response,
        @Query() query: GetItemsQuery,
    ) {
        const { isCompleteXml, limit, warehouseCode, lastUpdate } = query;
        if (isCompleteXml) {
            response.write(`<?xml version="1.0" encoding="utf-8"?>\n<SHOP>`);
        }

        for (let start = 0; start <= limit; start += this.pageSize ) {
            const items = await this.warehouseService.getItems({
                start,
                limit: this.pageSize > limit ? limit : this.pageSize,
                lastUpdate,
                warehouseCode
            });
            if (items.length === 0) {
                break;
            }
            response.write(items);
        }

        if (isCompleteXml) {
            response.write(`</SHOP>`);
        }
        response.end();
    }

    @Get('sets')
    @Header('Content-Type', 'application/xml')
    async getSets() {
        return this.warehouseService.getSets();
    }
}