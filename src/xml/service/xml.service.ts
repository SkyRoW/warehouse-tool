import { Injectable } from "@nestjs/common";
import { ShopItem } from "src/warehouse/model/shop-item.model";

@Injectable()
export class XmlService {
    constructor() {}

    private createShoptetItem(item: ShopItem): string {
        let xml = `
            <SHOPITEM>
    	    <ITEM_ID>${item.itemId}</ITEM_ID>
            <STOCK>
            <WAREHOUSES>`;
        for (const stock of item.warehouseStocks) {
            xml += `
                <WAREHOUSE>
                	<NAME>${stock.warehouseName}</NAME>
                	<VALUE>${stock.quantity}</VALUE>
            	</WAREHOUSE>`;
        }
        xml += `
            </WAREHOUSES>
            </STOCK>
            </SHOPITEM>`;
        return xml;
    }

    createShoptetItems(items: ShopItem[]): string {
        let xml = '';
        for (const item of items) {
            xml += this.createShoptetItem(item);
        }
        return xml;
    }
}