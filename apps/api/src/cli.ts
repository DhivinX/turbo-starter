import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';
import 'multer';

async function bootstrap() {
  await CommandFactory.run(AppModule, ['verbose', 'error', 'warn']);
}

bootstrap();
