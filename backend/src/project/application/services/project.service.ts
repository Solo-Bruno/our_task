import { Injectable, Inject } from '@nestjs/common';
import { ProjectRepositoryInterface } from '../../domain/repositories/project.repository.interface';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('ProjectRepositoryInterface')
    private readonly repository: ProjectRepositoryInterface,
  ) {}
}
