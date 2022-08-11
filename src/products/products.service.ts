import { Injectable } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductService {
  products: Product[] = [];

  create(title: string, description: string, price: number): string {
    const prodId = new Date().toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);

    return prodId;
  }

  getAll(): Product[] {
    return this.products;
  }

  getOne(prodId: string): Product | undefined {
    const product = this.findProduct(prodId)[0];
    return product;
  }

  update(
    prodId: string,
    title: string,
    description: string,
    price: number,
  ): Product {
    const [product, productIndex] = this.findProduct(prodId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[productIndex] = updatedProduct;

    return updatedProduct;
  }

  delete(prodId: string): { message: string } {
    const [, productIndex] = this.findProduct(prodId);
    this.products.splice(productIndex, 1);

    return {
      message: 'Product deleted successfully',
    };
  }

  private findProduct(prodId: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === prodId);
    const product = this.products[productIndex];

    if (!product) {
      throw new Error('Product not found');
    }
    return [product, productIndex];
  }
}
