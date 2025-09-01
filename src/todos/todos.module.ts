import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './entities/todo';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [TodosService],
  controllers: [TodosController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Todo.name,
        schema: TodoSchema,
      },
    ]),
    AuthModule,
  ],
})
export class TodosModule {}
