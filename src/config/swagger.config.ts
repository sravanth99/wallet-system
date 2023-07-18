import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
  .setTitle('Wallet System')
  .setDescription('A backend service for Wallet system')
  .setVersion('1.0.0')
  .addTag('wallet system')
  .build();
