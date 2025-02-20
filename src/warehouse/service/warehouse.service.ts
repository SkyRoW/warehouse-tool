import { Injectable } from "@nestjs/common";
import { FlexiBeeService } from "src/flexibee/service/flexibee.service";
import { XmlService } from "src/xml/service/xml.service";
import { GetItemsQuery } from "../model/get-items.query";
import { Response } from 'express';
import { FlexiBeeItemsQuery } from "src/flexibee/model/flexibee-items-query";
import { ShopItem } from "../model/shop-item.model";

@Injectable()
export class WarehouseService {
    constructor(
        private flexiBeeService: FlexiBeeService,
        private xmlService: XmlService,
    ) {}

    async getItems(query: FlexiBeeItemsQuery) {
        const items = await this.flexiBeeService.getWarehouseItems(query);
        return this.xmlService.createShoptetItems(items);
    }

    async getSets() {
        const codes = await this.flexiBeeService.getWarehouseSetCodes();
        const items: ShopItem[] = [];
        for (const code of codes) {
            const stock = await this.flexiBeeService.getWarehouseStockByCode(code);
            items.push({
                itemId: code,
                warehouseStocks: stock
            })
        }
        return this.xmlService.createShoptetItems(items);
    }
}