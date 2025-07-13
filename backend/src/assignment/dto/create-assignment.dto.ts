import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAssignmentDto {
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsNumber()
  @IsNotEmpty()
  numberOfDays: number;

  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  @IsNumber()
  @IsNotEmpty()
  medicationId: number;
}
