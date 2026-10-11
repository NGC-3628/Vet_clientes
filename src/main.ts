import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors(); 
  
  // cliente port
  const port = process.env.PORT || 3001; 
  
  await app.listen(port, '0.0.0.0'); 
  
  console.log(`Microservicio de Clientes escuchando en el puerto ${port}`);
}
bootstrap();