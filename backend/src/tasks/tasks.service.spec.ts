import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "src/prisma/prisma.service";
import { TasksService } from "./tasks.service";

describe("TasksService ownership", () => {
  const userId = 7;
  const otherUserId = 8;
  const taskId = 12;
  const ownedTask = {
    id: taskId,
    title: "My task",
    description: "Task description",
    isDone: false,
    userId,
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedAt: new Date("2026-01-01T00:00:00.000Z"),
  };
  const prismaMock = {
    task: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  let service: TasksService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it("allows a user to read their own task", async () => {
    prismaMock.task.findUnique.mockResolvedValue(ownedTask);

    await expect(service.getTask(taskId, userId)).resolves.toEqual({
      success: true,
      message: "Task Found successfully",
      data: ownedTask,
    });
  });

  it("allows a user to update their own task", async () => {
    const updatedTask = { ...ownedTask, title: "Updated task", isDone: true };
    prismaMock.task.findUnique.mockResolvedValue(ownedTask);
    prismaMock.task.update.mockResolvedValue(updatedTask);

    await expect(
      service.updateTask(taskId, { title: "Updated task", isDone: true }, userId),
    ).resolves.toMatchObject({
      success: true,
      data: updatedTask,
    });
    expect(prismaMock.task.update).toHaveBeenCalledWith({
      where: { id: taskId },
      data: {
        title: "Updated task",
        description: undefined,
        isDone: true,
      },
    });
  });

  it("allows a user to delete their own task", async () => {
    prismaMock.task.findUnique.mockResolvedValue(ownedTask);
    prismaMock.task.delete.mockResolvedValue(ownedTask);

    await expect(service.deleteTask(taskId, userId)).resolves.toMatchObject({
      success: true,
      message: "Task Deleted Successfully.",
    });
    expect(prismaMock.task.delete).toHaveBeenCalledWith({
      where: { id: taskId },
    });
  });

  it("prevents a user from reading another user's task", async () => {
    prismaMock.task.findUnique.mockResolvedValue({
      ...ownedTask,
      userId: otherUserId,
    });

    await expect(service.getTask(taskId, userId)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it("prevents a user from updating another user's task", async () => {
    prismaMock.task.findUnique.mockResolvedValue({
      ...ownedTask,
      userId: otherUserId,
    });

    await expect(
      service.updateTask(taskId, { title: "Updated task" }, userId),
    ).rejects.toBeInstanceOf(ForbiddenException);
    expect(prismaMock.task.update).not.toHaveBeenCalled();
  });

  it("prevents a user from deleting another user's task", async () => {
    prismaMock.task.findUnique.mockResolvedValue({
      ...ownedTask,
      userId: otherUserId,
    });

    await expect(service.deleteTask(taskId, userId)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
    expect(prismaMock.task.delete).not.toHaveBeenCalled();
  });

  it.each([
    ["read", (id: number) => service.getTask(id, userId)],
    ["update", (id: number) => service.updateTask(id, { title: "Updated" }, userId)],
    ["delete", (id: number) => service.deleteTask(id, userId)],
  ])("returns 404 when the task to %s does not exist", async (_operation, action) => {
    prismaMock.task.findUnique.mockResolvedValue(null);
    const result = action(taskId);

    await expect(result).rejects.toBeInstanceOf(NotFoundException);
    await expect(result).rejects.toMatchObject({ status: 404 });
  });

  it("returns only the authenticated user's tasks", async () => {
    prismaMock.task.findMany.mockResolvedValue([ownedTask]);

    await expect(service.getTasks(userId)).resolves.toMatchObject({
      data: [ownedTask],
    });

    expect(prismaMock.task.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { userId },
      }),
    );
  });
});
