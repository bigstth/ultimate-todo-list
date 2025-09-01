import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get('')
  get() {
    return this.todoService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('')
  create(@Body(new ValidationPipe()) payload: CreateTodoDto) {
    return this.todoService.createTodo(payload);
  }
}
