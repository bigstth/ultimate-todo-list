import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Todo {
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;
  @Prop({ default: () => new Date().toISOString() })
  date: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
