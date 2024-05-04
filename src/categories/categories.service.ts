import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepositort: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new Category();
    Object.assign(category, createCategoryDto);
    const createdCategory = await this.categoryRepositort.save(category);

    return category;
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepositort.find({ where: { isDeleted: false } });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepositort.findOne({
      where: { id: id, isDeleted: false },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);
    Object.assign(category, updateCategoryDto);
    const updatedCategory = await this.categoryRepositort.save(category);
    return updatedCategory;
  }

  async remove(id: number): Promise<Category> {
    const category = await this.findOne(id);
    category.isDeleted = true;
    return await this.categoryRepositort.save(category);
  }
}
