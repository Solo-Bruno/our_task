import { Column, Entity,  ManyToMany,  ManyToOne,  PrimaryGeneratedColumn } from 'typeorm';
import { StateOrmEntity } from '../../../../../state/infrastructure/persistence/typeorm/entities/state.orm-entity';
import { UserOrmEntity } from '../../../../../user/infrastructure/persistence/typeorm/entities/user.orm-entity';

@Entity('tasks')
export class TaskOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  startedAt: Date;

  @Column({ nullable: true })
  endedAt: Date;

  @ManyToOne(() => StateOrmEntity, (state) => state.tasks)
  state: StateOrmEntity;

  @ManyToMany(() => UserOrmEntity, (user) => user.tasks)
  users?: UserOrmEntity[];
}
