import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from '../../entities/lesson.entity';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { UsersLesson } from '../../entities/usersLesson.entity';
import { UsersLessonsService } from './usersLessons.service';
import { CurrentUser } from '../../auth/currentUser.decorator';
import { TokenAuthGuard } from '../../auth/token-auth.guard';

@Controller('users-lessons')
export class UsersLessonsController {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UsersLesson)
    private readonly usersLessonRepository: Repository<UsersLesson>,
    private readonly usersLessonsService: UsersLessonsService,
  ) {}

  @Get()
  async getAll() {
    return await this.usersLessonsService.getAll();
  }

  @Post() // Guard ???
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(TokenAuthGuard)
  async createUsersLesson(
    @CurrentUser() user: User,
    @Body() body: { id: number },
  ) {
    return this.usersLessonsService.createUsersLesson(user, body.id);
  }

  @Patch(':id')
  async updateUsersLesson(
    @Param('id') id: number,
    @Body() body: { isViewed: boolean },
  ) {
    return await this.usersLessonsService.updateUsersLesson(id, body.isViewed);
  }
}
