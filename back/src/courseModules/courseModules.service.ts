import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseModule } from '../entities/courseModule.entity';
import { Repository } from 'typeorm';
import { CreateCourseModuleDto } from './dto/createCourseModule.dto';
import { Course } from '../entities/course.entity';

@Injectable()
export class CourseModulesService {
  constructor(
    @InjectRepository(CourseModule)
    private readonly courseModulesRepository: Repository<CourseModule>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async getAll(courseId: number) {
    const courseModules = await this.courseModulesRepository
      .createQueryBuilder('course_module')
      .where('course_module.courseId = :courseId', { courseId })
      .leftJoinAndSelect('course_module.course', 'courseId')
      .select(['course_module', 'courseId.id'])
      .orderBy('course_module.number', 'ASC')
      .getMany();

    if (!courseModules.length) {
      throw new NotFoundException('No modules on this course!');
    }
    return courseModules;
  }

  async createCourseModule(body: CreateCourseModuleDto) {
    const courseModule = await this.courseModulesRepository.findOne({
      where: { course: { id: body.course }, number: body.number },
    });

    if (courseModule) {
      throw new BadRequestException('Such module already exists!');
    }

    const course = await this.courseRepository.findOne({
      where: { id: body.course },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const newCourseModule = await this.courseModulesRepository.create({
      course,
      number: body.number,
      title: body.title,
      description: body.description,
    });
    return this.courseModulesRepository.save(newCourseModule);
  }

  async updateCourseModule(id: number, body: CreateCourseModuleDto) {
    const courseModule = await this.courseModulesRepository.findOne({
      where: { id },
    });

    if (!courseModule) {
      throw new NotFoundException('Module not found');
    }

    courseModule.course = await this.checkCourseExists(body.course);
    courseModule.number = body.number;
    courseModule.title = body.title;
    courseModule.description = body.description;

    return await this.courseModulesRepository.save(courseModule);
  }

  async removeCourseModule(id: number) {
    const courseModule = await this.courseModulesRepository.findOne({
      where: { id },
    });

    if (!courseModule) {
      throw new NotFoundException(`Module with id ${id} not found`);
    }
    await this.courseModulesRepository.delete(id);
    return { message: `Module with id ${id} deleted` };
  }

  private async checkCourseExists(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }
}
