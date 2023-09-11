import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './entity/product.entity';
import { SaveProductDto } from './interface/save-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async save(@Body() body) {
    return await this.productService.save(body);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string) {
    return await this.productService.deleteById(id);
  }

  // @Get('')
  // async findAll() {
  //   return await this.productService.findAll();
  // }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page,
    @Query('limit', ParseIntPipe) limit,
    @Query('id') id?: string,
    @Query('description') description?: string,
    @Query('amount') amount?: number,
    @Query('amountPrice') amountPrice?: number,
  ) {
    return this.productService.findAll(
      page,
      limit,
      id,
      description,
      amount,
      amountPrice,
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.productService.findById(id);
  }

  @Put()
  async update(@Body() body: ProductEntity) {
    return await this.productService.update(body.id, body);
  }
}
