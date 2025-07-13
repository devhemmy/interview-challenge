import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';
import { Medication } from '../../medication/entities/medication.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  numberOfDays: number;

  @ManyToOne(() => Patient, (patient) => patient.assignments)
  patient: Patient;

  @ManyToOne(() => Medication, (medication) => medication.assignments)
  medication: Medication;
}
