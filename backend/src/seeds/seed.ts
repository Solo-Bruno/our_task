import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule, {
    logger: ['error', 'warn'],
  });

  const seeder = app.get(SeederService);

  try {
    await seeder.run();
  } catch (error) {
    console.error('Error durante el seeder:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

bootstrap();
