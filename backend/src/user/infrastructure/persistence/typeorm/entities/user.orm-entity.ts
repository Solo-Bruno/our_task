import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RolOrmEntity } from './rol.orm-entity';

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
}
