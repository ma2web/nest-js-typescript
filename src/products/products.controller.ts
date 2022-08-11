import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = this.productService.create(
      prodTitle,
      prodDesc,
      prodPrice,
    );

    return {
      message: 'Product created successfully',
      id: generatedId,
    };
  }

  @Get()
  getAll() {
    return this.productService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') prodId: string) {
    return this.productService.getOne(prodId);
  }

  @Patch(':id')
  update(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const product = this.productService.getOne(prodId);
    if (!product) {
      throw new Error('Product not found');
    }
    this.productService.update(prodId, prodTitle, prodDesc, prodPrice);

    return {
      message: 'Product updated successfully',
      product,
    };
  }

  @Delete(':id')
  delete(@Param('id') prodId: string) {
    const product = this.productService.getOne(prodId);
    if (!product) {
      throw new Error('Product not found');
    }
    this.productService.delete(prodId);

    return {
      message: 'Product deleted successfully',
      product,
    };
  }
}
