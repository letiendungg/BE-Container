import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area) private readonly areaRepository: Repository<Area>,
  ) {}

  async findAreaExist(place: string): Promise<Area> {
    return await this.areaRepository.findOne({
      where: { place, isDeleted: false },
    });
  }
  async create(createAreaDto: CreateAreaDto) {
    const areaExist = await this.findAreaExist(createAreaDto.place);
    if (areaExist) {
      throw new BadRequestException('Area is existing!!!');
    }
    const area = new Area();
    Object.assign(area, createAreaDto);
    return await this.areaRepository.save(area);
  }

  async findAll(): Promise<Area[]> {
    return await this.areaRepository.find({ where: { isDeleted: false } });
  }

  async findOne(id: number): Promise<Area> {
    const area = await this.areaRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!area) {
      throw new NotFoundException('Area not found');
    }

    return area;
  }

  async update(id: number, updateAreaDto: UpdateAreaDto): Promise<Area> {
    const area = await this.findOne(id);
    const areaExist = await this.findAreaExist(updateAreaDto.place);
    if (areaExist) {
      throw new BadRequestException('Area is existing!!!');
    }
    Object.assign(area, updateAreaDto);
    return await this.areaRepository.save(area);
  }

  async remove(id: number): Promise<Area> {
    const area = await this.findOne(id);
    area.isDeleted = true;
    return await this.areaRepository.save(area);
  }
}
