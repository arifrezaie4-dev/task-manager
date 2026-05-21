import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    @Get()
    fromTasks() {
        return "welcome From Tasks"
    }
}
