import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [NotesController],
  providers: [],
})
export class NotesModule {}
