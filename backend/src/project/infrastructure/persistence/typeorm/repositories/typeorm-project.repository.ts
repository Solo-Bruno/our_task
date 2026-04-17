import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectRepositoryInterface } from '../../../../domain/repositories/project.repository.interface';
import { ProjectOrmEntity } from '../entities/project.orm-entity';
import { ProjectEntity } from '../../../../domain/entities/project.entity';

@Injectable()
export class TypeOrmProjectRepository implements ProjectRepositoryInterface {
  constructor(
    @InjectRepository(ProjectOrmEntity)
    private readonly repository: Repository<ProjectOrmEntity>,
  ) {}
  create(project: ProjectEntity): Promise<ProjectEntity> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<ProjectEntity | null> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<ProjectEntity[]> {
    throw new Error('Method not implemented.');
  }
  update(project: ProjectEntity): Promise<ProjectEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  addUserToProject(projectId: string, userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
