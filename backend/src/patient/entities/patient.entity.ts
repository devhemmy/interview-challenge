import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Assignment } from '../../assignment/entities/assignment.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dateOfBirth: Date;

  @OneToMany(() => Assignment, (assignment) => assignment.patient)
  assignments: Assignment[];
}
