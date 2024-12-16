import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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

  getTask(id: number) {
    // Buscar en BD
    // Otras funciones
    const taskFound = this.tasks.find((task) => task.id === id);
    if (!taskFound) {
      // Throw 404 error
      return new NotFoundException(`Task with id ${id} not found`);
    }
    return taskFound;
  }

  createTask(task: CreateTaskDto) {
    // Crear en BD
    // Otras funciones
    console.log(task);
    this.tasks.push({
      ...task,
      id: this.tasks.length + 1,
    });

    return task;
  }

  updateTask(task: UpdateTaskDto) {
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
