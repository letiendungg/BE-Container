import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContainerDto } from './dto/create-container.dto';
import { UpdateContainerDto } from './dto/update-container.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Container } from './entities/container.entity';
import { Repository } from 'typeorm';
import { ApplicationsService } from 'src/applications/applications.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CategoriesService } from 'src/categories/categories.service';
import { uid } from 'uid';
import { ContainerType } from './entities/containerType.entity';
import { Application } from 'src/applications/entities/application.entity';

@Injectable()
export class ContainersService {
  constructor(
    @InjectRepository(Container)
    private readonly containerRepository: Repository<Container>,
    @InjectRepository(ContainerType)
    private readonly typeContainerRepository: Repository<ContainerType>,
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    private readonly applicationService: ApplicationsService,
    private readonly userService: UsersService,
    private readonly categoryService: CategoriesService,
  ) {}
  async findContainerById(idContainer: string) {
    const container = await this.containerRepository.findOne({
      where: { id: idContainer, isDeleted: false },
    });
    if (!container) {
      throw new NotFoundException('Container not found!!!');
    }
    return container;
  }

  async findAllByApplication(applicationId: number) {
    const application = await this.applicationService.findOne(applicationId);
    return await this.containerRepository.find({
      where: { application: application },
    });
  }
  async findOne(id: string) {
    const container = await this.containerRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!container) {
      throw new NotFoundException('Container not found!!!');
    }
    return container;
  }
  async getTypeContainer() {
    return await this.typeContainerRepository.find();
  }
  async findTypeContainerById(id: number) {
    const typeContainer = await this.typeContainerRepository.findOne({
      where: { id },
    });
    if (!typeContainer) {
      throw new NotFoundException('Type Container not found!');
    }
    return typeContainer;
  }
  async create(createContainerDto: CreateContainerDto) {
    const container = new Container();
    Object.assign(container, createContainerDto);
    const category = await this.categoryService.findOne(
      createContainerDto.type,
    );
    const typeContainer = await this.findTypeContainerById(
      createContainerDto.typeContainer,
    );
    container.typeContainer = typeContainer;
    container.type = category;
    const code = uid(6);
    container.code = code;
    return await this.containerRepository.save(container);
  }

  async update(
    id: string,
    updateContainerDto: UpdateContainerDto,
    currentUser: User,
  ) {
    const container = await this.findContainerById(id);
    const application = await this.applicationService.findOne(
      container.application.id,
    );
    const isAllowed = this.userService.checkAuthor(
      application.company.id,
      currentUser,
    );
    if (!isAllowed) {
      throw new ForbiddenException('Your are not allowed update it');
    }
    Object.assign(container, updateContainerDto);
    await this.containerRepository.save(container);
    const applicationUpdate = await this.applicationService.findOne(
      container.application.id,
    );
    return await this.applicationService.updateTotalPriceApplication(
      applicationUpdate.id,
      applicationUpdate.containers,
    );
  }

  async delete(id: string, currentUser: User) {
    const container = await this.findContainerById(id);
    const application = await this.applicationService.findOne(
      container.application.id,
    );
    const isAllowed = this.userService.checkAuthor(
      application.company.id,
      currentUser,
    );
    if (!isAllowed) {
      throw new ForbiddenException('Your are not allowed update it');
    }
    container.isDeleted = true;
    await this.containerRepository.save(container);
    const applicationUpdate = await this.applicationService.findOne(
      container.application.id,
    );
    return await this.applicationService.updateTotalPriceApplication(
      applicationUpdate.id,
      applicationUpdate.containers,
    );
  }
}
