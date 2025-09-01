import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: Model<Todo>,
  ) {}

  async createTodo(payload: CreateTodoDto): Promise<Todo | undefined> {
    const existing = await this.todoModel
      .findOne({ name: payload.name })
      .exec();

    if (existing) throw new ConflictException('Todo already exists');

    const todo = await this.todoModel.create(payload);

    return {
      _id: todo._id,
      name: todo.name,
      description: todo?.description || '',
      date: todo.date,
    };
  }

  async findAll(): Promise<Todo[] | undefined> {
    const todos = await this.todoModel.find().exec();

    return todos.map((todo) => ({
      _id: todo._id,
      name: todo.name,
      description: todo?.description || '',
      date: todo.date,
    }));
  }
}
