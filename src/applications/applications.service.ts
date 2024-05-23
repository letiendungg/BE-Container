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
import { ROLE } from 'src/untility/enum/role-user';
import { Container } from 'src/containers/entities/container.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    private readonly taskService: TaskService,
    @Inject(forwardRef(() => ContainersService))
    private readonly containerService: ContainersService,
  ) {}

  calculateTotalPrice(containers: Container[]) {
    let price = 0;
    containers.forEach((container) => {
      price = price + container.typeContainer.percenPrice * container.weight;
    });
    return price;
  }
  async updateTotalPriceApplication(
    applicationId: number,
    containers: Container[],
  ) {
    const application = await this.findOne(applicationId);
    application.price = this.calculateTotalPrice(containers);
    return await this.applicationRepository.save(application);
  }
  async create(createApplicationDto: CreateApplicationDto, currentUser: User) {
    const application = new Application();
    Object.assign(application, createApplicationDto);

    const containerPromises = createApplicationDto.containersData.map(
      (containerData) => {
        return this.containerService.create(containerData);
      },
    );
    const containers = await Promise.all(containerPromises);

    const price = this.calculateTotalPrice(containers);
    application.price = price;
    application.sentDate = new Date();
    application.containers = containers;
    application.status = StatusEnum.Pending;
    return await this.applicationRepository.save(application);
  }

  async findAll(page: number, limit: number, currentUser: User) {
    if (currentUser.role === ROLE.ADMIN) {
      currentUser = undefined;
    }
    const [applications, total] = await this.applicationRepository.findAndCount(
      {
        skip: (page - 1) * limit,
        take: limit,
        order: { createdAt: 'DESC' },
        where: { company: currentUser },
      },
    );
    const pages = Math.ceil(total / limit);
    return { page, limit, applications, pages };
  }

  async findOne(id: number) {
    const application = await this.applicationRepository.findOne({
      where: { id },
    });
    const containers = application.containers.filter(
      (container) => container.isDeleted === false,
    );
    application.containers = containers;
    if (!application) {
      throw new NotFoundException('Application not found!!!');
    }
    return application;
  }

  async update(id: number, updateApplicationDto: UpdateApplicationDto) {
    const application = await this.findOne(id);
    Object.assign(application, updateApplicationDto);
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
