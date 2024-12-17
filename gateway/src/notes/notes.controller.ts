import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/auth.guard';
import { NATS_SERVICE } from 'src/config';
import { CreateNoteDto } from './dto/create-note.dto';
import { User } from 'src/common/decorators/user.decorator';
import { User as IUser } from 'src/auth/entities/auth.entity';
import { catchError } from 'rxjs';

@Controller('notes')
export class NotesController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @UseGuards(AuthGuard)
  @Post()
  createNote(@Body() createNoteDto: CreateNoteDto, @User() user: IUser) {
    return this.client
      .send('notes.create', {
        ...createNoteDto,
        userId: user.id,
      })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @UseGuards(AuthGuard)
  @Get()
  getNotes(@User() user: IUser) {
    return this.client.send('notes.findAll', user.id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
