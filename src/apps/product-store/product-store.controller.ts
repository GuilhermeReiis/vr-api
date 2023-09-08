import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SaveProductStoreDto } from './interface/save-product-store.dto';
import { ProductStoreService } from './product-store.service';
import { ProductStoreEntity } from './entity/product-store.entity';

@Controller('product-store')
export class ProductStoreController {
  constructor(private productStoreService: ProductStoreService) {}

  @Post()
  async save(@Body() body: SaveProductStoreDto): Promise<any> {
    return await this.productStoreService.save(body);
  }

  @Get(':id')
  async listSoreRegister(@Param('id') id: string) {
    return await this.productStoreService.listSoreRegister(id);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string) {
    return await this.productStoreService.deleteById(id);
  }

  @Put()
  async update(@Body() body: any) {
    return await this.productStoreService.update(body.id, body);
  }
}
