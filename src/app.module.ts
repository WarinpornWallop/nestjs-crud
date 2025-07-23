import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttractionModule } from './attraction/attraction.module';
import { Attraction } from './attraction/entities/attraction.entity';
import { ConfigModule } from '@nestjs/config'; 

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      database: process.env.DB_NAME,
      entities: [Attraction],
      synchronize: true, // Set to false in production
    }),
    UserModule,
    AttractionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
