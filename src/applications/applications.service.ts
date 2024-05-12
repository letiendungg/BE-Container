import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { TakeTask } from './entities/takeTask.entity';
import { TaskService } from './tasks.service';
import { ContainersService } from 'src/containers/containers.service';
import { User } from 'src/users/entities/user.entity';
import { StatusEnum } from 'src/untility/enum/status';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    private readonly taskService: TaskService,
    @Inject(forwardRef(() => ContainersService))
    private readonly containerService: ContainersService,
  ) {}
  async create(createApplicationDto: CreateApplicationDto, currentUser: User) {
    const application = new Application();
    Object.assign(application, createApplicationDto);

    const containerPromises = createApplicationDto.containersData.map(
      (containerData) => {
        return this.containerService.create(containerData);
      },
    );
    const containers = await Promise.all(containerPromises);

    application.sentDate = new Date();
    application.containers = containers;
    application.status = StatusEnum.Pending;
    return await this.applicationRepository.save(application);
  }

  findAll() {
    return `This action returns all applications`;
  }

  async findOne(id: number) {
    const application = await this.applicationRepository.findOne({
      where: { id },
    });
    if (!application) {
      throw new NotFoundException('Application not found!!!');
    }
    return application;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
