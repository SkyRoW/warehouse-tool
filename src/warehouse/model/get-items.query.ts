import { IsBoolean, IsInt, IsISO8601, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetItemsQuery {
    @IsString()
    @IsOptional()
    warehouseCode?: string;

    @IsInt()
    @Transform(({value}) => Number(value))
    @IsOptional()
    limit: number = Number.MAX_SAFE_INTEGER;

    @IsISO8601()
    @IsOptional()
    lastUpdate?: string;
    
    @IsBoolean()
    @Transform(({value}) => value === 'true')
    @IsOptional()
    isCompleteXml?: boolean = true;
}