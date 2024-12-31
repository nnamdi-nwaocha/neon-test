// File: src/tasks/tasks.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) { }

    // Fetches all tasks from the database.
    async findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    // Creates a new task and saves it to the database.
    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.taskRepository.create(createTaskDto);
        return this.taskRepository.save(task);
    }

    // Updates an existing task identified by its ID.
    async update(id: number, updateData: Partial<Task>): Promise<Task> {
        await this.taskRepository.update(id, updateData);
        return this.taskRepository.findOneBy({ id });
    }

    // Deletes a task identified by its ID.
    async delete(id: number): Promise<void> {
        await this.taskRepository.delete(id);
    }
}