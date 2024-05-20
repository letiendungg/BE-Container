import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthenticationGuard } from './untility/guards/authentication.guard';
import { AuthorizationGuard } from './untility/guards/authorization.guard';
import { DataSource } from 'typeorm';
import { CurrentUserMiddleware } from './untility/middleware/current-user.middleware';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { AreasModule } from './areas/areas.module';
import { Area } from './areas/entities/area.entity';
import { ShipsModule } from './ships/ships.module';
import { Ship } from './ships/entities/ship.entity';
import { ContainersModule } from './containers/containers.module';
import { Container } from './containers/entities/container.entity';
import { ApplicationsModule } from './applications/applications.module';
import { Application } from './applications/entities/application.entity';
import { TakeTask } from './applications/entities/takeTask.entity';
import { ContainerType } from './containers/entities/containerType.entity';
import { Port } from './ships/entities/port.entity';
import { ShipSchedule } from './ships/entities/shipSchedule';
import { Cluster } from './areas/entities/cluster.entity';
import { Location } from './areas/entities/location.entity';
import { DocumentsModule } from './documents/documents.module';
import { Document } from './documents/entities/document.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'lehao1911',
      database: 'container',
      entities: [
        User,
        Category,
        Area,
        Ship,
        Container,
        Application,
        TakeTask,
        ContainerType,
        Port,
        ShipSchedule,
        Cluster,
        Location,
        Document,
      ],
      synchronize: true,
    }),
    UsersModule,
    CategoriesModule,
    AreasModule,
    ShipsModule,
    ContainersModule,
    ApplicationsModule,
    DocumentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
    Reflector,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
