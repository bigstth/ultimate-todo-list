import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { MongoIdValidationPipe } from 'src/utils/pipes/mongo-id-validation.pipe';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get('')
  find() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new MongoIdValidationPipe()) id: string) {
    return this.todoService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post('')
  create(@Body(new ValidationPipe()) payload: CreateTodoDto) {
    return this.todoService.createTodo(payload);
  }
}
