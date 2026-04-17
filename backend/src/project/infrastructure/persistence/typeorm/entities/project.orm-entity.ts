import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserOrmEntity } from '../../../../../user/infrastructure/persistence/typeorm/entities/user.orm-entity';
import { EpochOrmEntity } from '../../../../../epoch/infrastructure/persistence/typeorm/entities/epoch.orm-entity';

@Entity('projects')
export class ProjectOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  startedAt: Date;

  @Column({ nullable: true })
  endedAt: Date;

  @ManyToMany(() => UserOrmEntity, (user) => user.projects)
  users: UserOrmEntity[];

  @OneToMany(() => EpochOrmEntity, (epoch) => epoch.project)
  epochs?: EpochOrmEntity[];
}
