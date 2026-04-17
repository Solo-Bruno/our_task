import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EpochOrmEntity } from '../../../../../epoch/infrastructure/persistence/typeorm/entities/epoch.orm-entity';
import { TaskOrmEntity } from '../../../../../task/infrastructure/persistence/typeorm/entities/task.orm-entity';

@Entity('states')
export class StateOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @ManyToOne(() => EpochOrmEntity, (epoch) => epoch.states)
  epoch: EpochOrmEntity;

  @OneToMany(() => TaskOrmEntity, (task) => task.state)
  tasks?: TaskOrmEntity[];
}
