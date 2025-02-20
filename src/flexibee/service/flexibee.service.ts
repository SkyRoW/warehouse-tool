import { Injectable } from "@nestjs/common";
import { FlexiBeeHttpService } from "./flexibee-http.service";
import { ShopItem } from "src/warehouse/model/shop-item.model";
import { FlexiBeeMapperService } from "./flexibee-mapper.service";
import { FlexiBeeItemsQuery } from "../model/flexibee-items-query";
import { FlexiBeeShopItem } from "../model/flexibee-shop-item.model";
import { FlexiBeeSetItem } from "../model/flexibee-set-item.model";
import { FlexiBeeWarehouseStock } from "../model/flexibee-warehouse-stock.model";
import { WarehouseStock } from "src/warehouse/model/warehouse-stock.model";

@Injectable()
export class FlexiBeeService {
    constructor(
        private flexiBeeHttpService: FlexiBeeHttpService,
        private flexiBeeMapperService: FlexiBeeMapperService,
    ) {}

    async getWarehouseItems(query: FlexiBeeItemsQuery): Promise<ShopItem[]> {
        const { start, limit, warehouseCode, lastUpdate } = query;
        const filters: string[] = [];
        if (warehouseCode) {
            filters.push(`sklad='code:${warehouseCode}'`);
        }

        if (lastUpdate) {
            filters.push(`lastUpdate>${lastUpdate}`);
        }

        let url = filters.length
            ? `skladova-karta/(${filters.join(' and ')}).json`
            : `skladova-karta.json`;

        url += `?detail=custom:cenik,sklad,dostupMj&limit=${limit}&start=${start}`;

        const result = await this.flexiBeeHttpService.get<{ "skladova-karta": FlexiBeeShopItem[] }>(url);
        return result["skladova-karta"]?.map(this.flexiBeeMapperService.mapFlexiBeeShopItemToDomainShopItem);
    }

    async getWarehouseSetCodes(): Promise<Set<string>> {
        const sets = await this.flexiBeeHttpService.get<{ "sady-a-komplety": FlexiBeeSetItem[] }>(`sady-a-komplety.json?detail=custom:cenikSada&limit=0`);
        const uniqueSets = new Set<string>();
        sets?.["sady-a-komplety"].forEach(item => {
            if (uniqueSets.has(item.cenikSada)) {
                return false;
            }
            uniqueSets.add(item.cenikSada);
            return true;
        });
        return uniqueSets;
    }

    async getWarehouseStockByCode(code: string): Promise<WarehouseStock[] | null> {
        const result = await this.flexiBeeHttpService.get<{ sum: { stavyCenikGroupStavy: { values }}}>(`cenik/(id='${code}')/$sum.json`);
        const object = result?.sum?.stavyCenikGroupStavy?.values;
        if (object) {
            const array: FlexiBeeWarehouseStock[] = Object.values(object);
            return array.map(this.flexiBeeMapperService.mapFlexiBeeWarehouseStockToDomainWarehouseStock);
        }
        return null;
    }
}