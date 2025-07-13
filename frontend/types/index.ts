export interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
}

export interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
}

export interface AssignmentWithRemainingDays {
  id: number;
  startDate: string;
  numberOfDays: number;
  patient: Patient;
  medication: Medication;
  remainingDays: number;
}
