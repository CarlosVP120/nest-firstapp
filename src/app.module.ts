import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diccionario } from './entities/Diccionario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'srv-data',
      port: 1521,
      username: 'EMPRESA_01',
      password: '1DrallN3w23',
      serviceName: 'idrallpdb1.db.net',
      synchronize: false,
      entities: [__dirname + '/entities/*.entity.js'],
    }),
    TypeOrmModule.forFeature([Diccionario]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
