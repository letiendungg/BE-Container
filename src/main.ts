import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './untility/interceptor/logging.interceptor';
import { AuthenticationGuard } from './untility/guards/authentication.guard';
import { AuthorizationGuard } from './untility/guards/authorization.guard';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  config();
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalGuards(
    new AuthenticationGuard(new Reflector()),
    new AuthorizationGuard(new Reflector()),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(5000);
}
bootstrap();
