import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @Column({ nullable: true })
  createdBy?: string;

  @CreateDateColumn({ nullable: true })
  createdDate?: Date;

  @Column({ nullable: true })
  updatedBy?: string;

  @UpdateDateColumn({ nullable: true })
  updatedDate?: Date;
}
