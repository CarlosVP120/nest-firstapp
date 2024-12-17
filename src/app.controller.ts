import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diccionario } from './entities/Diccionario.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Diccionario)
    private diccionarioRepository: Repository<Diccionario>,
  ) {}

  @Get('diccionario')
  async getDiccionario() {
    return await this.diccionarioRepository.find();
  }
}
