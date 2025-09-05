import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { getModelToken } from '@nestjs/mongoose';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getModelToken('Todo'),
          useValue: {
            create: jest.fn().mockImplementation((payload) => ({
              _id: 'mocked_id',
              name: payload.name,
              description: payload.description,
              date: new Date().toISOString(),
            })),
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue([
                {
                  name: 'Test Todo',
                  description: 'Test Description',
                  date: new Date().toISOString(),
                },
              ]),
            }),
            findOne: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(null),
            }),
            findById: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue({
                _id: 'mocked_id',
                name: 'Test Todo',
                description: 'Test Description',
                date: new Date().toISOString(),
              }),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.only('should get todos', async () => {
    const result = await service.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result?.length).toBeGreaterThan(0);
    expect(result?.[0]).toHaveProperty('name', 'Test Todo');
    expect(result?.[0]).toHaveProperty('description', 'Test Description');
    expect(result?.[0]).toHaveProperty('date');
  });

  it.only('should create a todo', async () => {
    const dto: CreateTodoDto = {
      name: 'Test Todo',
      description: 'Test Description',
    };

    const result = await service.createTodo(dto);
    expect(result).toHaveProperty('name', dto.name);
    expect(result).toHaveProperty('description', dto.description);
    expect(result).toHaveProperty('date');
  });

  it.only('should get todo', async () => {
    const todoId = 'mocked_id';

    const result = await service.findOne(todoId);

    expect(result).toHaveProperty('name', 'Test Todo');
    expect(result).toHaveProperty('description', 'Test Description');
    expect(result).toHaveProperty('date');
  });
});
