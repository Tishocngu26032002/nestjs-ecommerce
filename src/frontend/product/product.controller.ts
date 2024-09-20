import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  @Get('lists')
  async getListProduct() {
    return 'list';
  }

  @Post()
  async store() {}

  @Get(':id')
  async detail() {}

  @Patch(':id')
  async update() {}

  @Delete(':id')
  async deleteProduct() {}
}
