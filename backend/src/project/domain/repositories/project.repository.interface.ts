import { ProjectEntity } from '../entities/project.entity';

export abstract class ProjectRepositoryInterface {
  abstract create(project: ProjectEntity): Promise<ProjectEntity>;
  abstract findById(id: string): Promise<ProjectEntity | null>;
  abstract findAll(): Promise<ProjectEntity[]>;
  abstract update(project: ProjectEntity): Promise<ProjectEntity>;
  abstract delete(id: string): Promise<void>;
  abstract addUserToProject(projectId: string, userId: string): Promise<void>;
}
