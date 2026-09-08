import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('admin/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async createProduct(@Body() data: CreateProductDto) {
    return await this.productService.create(data);
  }

  @Post('update')
  async updateProduct(@Body() data: UpdateProductDto) {
    return await this.productService.update(data);
  }
}
