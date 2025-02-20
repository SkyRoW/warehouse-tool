import { Injectable } from "@nestjs/common";
import { FlexiBeeShopItem } from "../model/flexibee-shop-item.model";
import { ShopItem } from "src/warehouse/model/shop-item.model";
import { FlexiBeeWarehouseStock } from "../model/flexibee-warehouse-stock.model";
import { WarehouseStock } from "src/warehouse/model/warehouse-stock.model";

@Injectable()
export class FlexiBeeMapperService {
    mapFlexiBeeShopItemToDomainShopItem(flexiBeeShopItem: FlexiBeeShopItem): ShopItem {
        return {
            itemId: flexiBeeShopItem.cenik.replace('code:',''),
            warehouseStocks: [
                {
                    warehouseName: flexiBeeShopItem.sklad.replace('code:',''),
                    quantity: flexiBeeShopItem.dostupMj,
                }
            ]
        }
    }

    mapFlexiBeeWarehouseStockToDomainWarehouseStock(flexiBeeWarehouseStock: FlexiBeeWarehouseStock): WarehouseStock {
        return {
            warehouseName: flexiBeeWarehouseStock.msg,
            quantity: Number(flexiBeeWarehouseStock.value)
        }
    }
}