import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RolOrmEntity } from './rol.orm-entity';
import { ProjectOrmEntity } from '../../../../../project/infrastructure/persistence/typeorm/entities/project.orm-entity';
import { TaskOrmEntity } from '../../../../../task/infrastructure/persistence/typeorm/entities/task.orm-entity';

@Entity('users')
export class UserOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => RolOrmEntity, (rol) => rol.users)
  rol?: RolOrmEntity;

  @ManyToMany(() => ProjectOrmEntity, (project) => project.users)
  @JoinTable({
    name: 'project_users',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'project_id', referencedColumnName: 'id' },
  })
  projects: ProjectOrmEntity[];

  @ManyToMany(() => TaskOrmEntity, (task) => task.users)
  tasks?: TaskOrmEntity[];
}
