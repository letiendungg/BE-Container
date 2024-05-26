import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { QuickQuoteDto } from './dto/quick-quote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { TakeTask } from './entities/takeTask.entity';
import { TaskService } from './tasks.service';
import { ContainersService } from 'src/containers/containers.service';
import { User } from 'src/users/entities/user.entity';
import { StatusEnum } from 'src/untility/enum/status';
import { containerType } from 'src/untility/enum/container-type';
import { productType } from 'src/untility/enum/product-type';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly httpService: HttpService,
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

  private computeContainer(weightOfGoods: number, containerType: object) {
    let containerQuantity: number = 0;
    containerQuantity = Math.ceil(weightOfGoods / containerType['capacity']);
    return containerQuantity;
  }

  // call to FastAPI
  async getDistance(addressFrom, addressTo): Promise<any> {
    // url for call FastAPI
    let url = `http://localhost:8000/distance`;
    const data = {
      from: addressFrom,
      to: addressTo,
    };
    try {
      const response = await lastValueFrom(this.httpService.post(url, data));
      return response.data;
    } catch (error) {
      // Xử lý lỗi nếu có
      throw new Error(`Error: ${error.message}`);
    }
  }

  async quickQuote(createQuickQuote: QuickQuoteDto): Promise<any> {
    let weightOfGoods: number = createQuickQuote.weight;
    let from: string = createQuickQuote.from;
    let to: string = createQuickQuote.to;
    const container_type = createQuickQuote.container_type;
    const product_type = createQuickQuote.product_type;

    // get element in list container type
    let container = containerType.find(
      (element) => element.name === container_type,
    );

    let product = productType.find((element) => element.name === product_type);

    // call function to compute container quantity
    let containerQuantity = this.computeContainer(weightOfGoods, container);

    // cost container per weight of goods
    let costContainer = containerQuantity * container.cost;

    // cost product per weight of goods
    let costProduct = weightOfGoods * product.cost;

    // get distance
    let distance: any = this.getDistance(from, to);

    // cost per distance
    let costPerDistance = parseInt(distance) * 100;

    // total cost
    let totalCost = costContainer + costProduct + costPerDistance;
    console.log('estimate cost:', totalCost);
    return totalCost;
  }
}
