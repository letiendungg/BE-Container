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

@Injectable()
export class ContainersService {
  constructor(
    @InjectRepository(Container)
    private readonly containerRepository: Repository<Container>,
    private readonly applicationService: ApplicationsService,
    private readonly userService: UsersService,
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

  async create(createContainerDto: CreateContainerDto) {
    const container = new Container();
    Object.assign(container, createContainerDto);
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
    return await this.containerRepository.save(container);
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
    return await this.containerRepository.save(container);
  }
}
