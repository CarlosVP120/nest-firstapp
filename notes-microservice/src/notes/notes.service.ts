import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class NotesService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(createNoteDto: CreateNoteDto) {
    try {
      return await this.note.create({
        data: createNoteDto,
      });
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error.message,
      });
    }
  }

  async findAll(userId: string) {
    return await this.note.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
