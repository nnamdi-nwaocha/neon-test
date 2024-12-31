// File: src/tasks/tasks.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  // Handles GET requests to fetch all tasks.
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  // Handles POST requests to create a new task.
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  // Handles PATCH requests to update a task by ID.
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<CreateTaskDto>) {
    return this.tasksService.update(+id, updateData);
  }

  // Handles DELETE requests to delete a task by ID.
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.delete(+id);
  }
}

