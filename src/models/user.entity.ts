import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('User')
export class User extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 125, unique: true })
  email: string;
}
