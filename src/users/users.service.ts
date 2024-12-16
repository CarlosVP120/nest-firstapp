import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = ['User 1', 'User 2', 'User 3'];

  getUsers() {
    // Buscar en BD
    // Otras funciones

    return this.users;
  }
}
