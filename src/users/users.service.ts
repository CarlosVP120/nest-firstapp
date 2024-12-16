import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: any = ['User 1', 'User 2', 'User 3'];

  getUsers() {
    // Buscar en BD
    // Otras funciones

    return this.users;
  }

  createUser(user: CreateUserDto) {
    // Crear en BD
    // Otras funciones

    this.users.push(user);

    return {
      ...user,
      id: this.users.length + 1,
    };
  }
}
