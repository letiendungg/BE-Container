import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TakeTask } from './entities/takeTask.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/createTask.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TakeTask)
    private readonly taskRepository: Repository<TakeTask>,
    private readonly userService: UsersService,
  ) {}

  async findTaskStaff(staffID: number) {
    const user = await this.userService.findOne(staffID);
    return await this.taskRepository.find({ where: { staff: user } });
  }
  async findTask(idTask: number) {
    const taskFound = await this.taskRepository.findOne({
      where: { id: idTask, isDeleted: false },
    });
    if (!taskFound) {
      throw new NotFoundException('Task not found!!!');
    }
    return taskFound;
  }
  async assignTask(createTaskDto: CreateTaskDto) {
    const newTask = new TakeTask();
    Object.assign(newTask, createTaskDto);
    newTask.beginTime = new Date();
    newTask.isDone = false;
    return await this.taskRepository.save(newTask);
  }

  async doneTask(taskId: number) {
    const task = await this.findTask(taskId);
    task.isDone = true;
    task.finishTime = new Date();
    return await this.taskRepository.save(task);
  }

  async updateTask(
    taskId: number,
    createTaskDto: CreateTaskDto,
    currentUser: User,
  ) {
    const task = await this.findTask(taskId);
    const isAuth = this.userService.checkAuthor(task.staff.id, currentUser);
    if (!isAuth) {
      throw new BadRequestException('You are not allowed delete task!');
    }
    task.staff = createTaskDto.staff;
    return await this.taskRepository.save(task);
  }

  async deleteTask(taskID: number, currentUSer: User) {
    const task = await this.findTask(taskID);
    const isAuth = this.userService.checkAuthor(task.staff.id, currentUSer);
    if (!isAuth) {
      throw new BadRequestException('You are not allowed delete task!');
    }
    task.isDeleted = true;
    task.finishTime = new Date();
    task.isDone = false;
    return await this.taskRepository.save(task);
  }
}
