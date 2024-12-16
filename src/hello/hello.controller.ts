import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { query, Request, Response } from 'express';
import { ValidateuserPipe } from './pipes/validateuser/validateuser.pipe';
import { AuthGuard } from './guards/auth/auth.guard';

@Controller()
export class HelloController {
  @Get('/')
  index(@Req() request: Request, @Res() response: Response) {
    response.status(200).json({ message: 'Hello World!' });
  }

  @Get('new')
  @HttpCode(201)
  new() {
    return 'New';
  }

  @Get('notfound')
  @HttpCode(404)
  notFound() {
    return '404: Not found';
  }

  @Get('error')
  @HttpCode(500)
  error() {
    return '500: Internal server error';
  }

  @Get('ticket/:num')
  getNumber(@Param('num', ParseIntPipe) num: number) {
    return num + 2;
  }

  @Get('active/:status')
  isUserActive(@Param('status', ParseBoolPipe) status: boolean) {
    return status;
  }

  @Get('greet')
  @UseGuards(AuthGuard)
  greet(@Query(ValidateuserPipe) query: { name: string; age: number }) {
    return `Hello ${query.name}, you are ${query.age} years old`;
  }
}
