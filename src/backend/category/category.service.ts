import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../../entities/categoryentity/category.entity';
import { Repository } from 'typeorm';
import { categoryCreateDTO } from '../../dto/categoryDTO/category.create.dto';
import * as slug from 'slug';
import { categoryUpdateDTO } from '../../dto/categoryDTO/category.update.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}

  async getList(page: number = 1, limit: number = 10, filters: any) {
    if (page < 1) {
      throw new Error('PAGE NUMBER MUST BE GREATER THAN 0!');
    }

    if (limit < 1) {
      throw new Error('LIMIT MUST BE GREATER THAN 0!');
    }

    const condition: any = {};

    if (filters.hot) condition.c_hot = filters.hot;
    if (filters.status) condition.c_status = filters.status;

    const [list, total] = await this.categoryRepo.findAndCount({
      where: condition,
      skip: (page - 1) * limit,
      take: limit,
    });

    if (!list) throw new Error('NO CATEGORY!');

    return {
      data: list,
      total,
      page,
      limit,
    };
  }

  async create(createCate: categoryCreateDTO) {
    createCate.c_slug = slug(createCate.c_name);
    const chechExists = await this.categoryRepo.findOneBy({
      c_name: createCate.c_name,
    });
    // throw error exsist
    if (chechExists) {
      throw new Error('CATEGORY EXSIST!');
    }

    // insert into db
    const category = this.categoryRepo.create(createCate);
    const check = await this.categoryRepo.save(category);
    // check action insert
    if (!check) {
      throw new Error('OCCUR ERROR WHEN SAVE CATEGORY TO DB!');
    }
    return {
      c_name: check.c_name,
    };
  }

  async detail(id: number) {
    const catedetail = await this.categoryRepo.findOneBy({ id: id });

    if (!catedetail) {
      throw new Error('id not exists!');
    }

    return catedetail;
  }

  async update(id: number, categoryUpdateDTO: categoryUpdateDTO) {
    const cate = await this.categoryRepo.findOneBy({ id: id });

    if (!cate) {
      throw new Error('cate not exists!');
    }

    Object.assign(cate, categoryUpdateDTO);

    const check = this.categoryRepo.save(cate);
    if (!check) {
      throw new Error('update not success!');
    }

    return check;
  }

  async delete() {}
}
