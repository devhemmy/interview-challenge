import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Assignment } from '../../assignment/entities/assignment.entity';

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dosage: string;

  @Column()
  frequency: string;

  @OneToMany(() => Assignment, (assignment) => assignment.medication)
  assignments: Assignment[];
}
