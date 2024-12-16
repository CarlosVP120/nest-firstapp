import { Injectable } from '@nestjs/common';

export interface Task {
  name: string;
  status: string;
}

@Injectable()
export class TasksService {
  private tasks = [];

  getAllTasks() {
    // Buscar en BD
    // Otras funciones

    return this.tasks;
  }

  createTask(task: any) {
    // Crear en BD
    // Otras funciones
    console.log(task);
    this.tasks.push(task);
    return task;
  }

  updateTask() {
    // Actualizar en BD
    // Otras funciones

    return 'Task updated';
  }

  deleteTask() {
    // Borrar en BD
    // Otras funciones

    return 'Task deleted';
  }

  patchTask() {
    // Actualizar en BD
    // Otras funciones

    return 'Task patched';
  }
}
