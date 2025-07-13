import { BACKEND_URL } from '../lib/constants';
import { AssignmentWithRemainingDays, Patient, Medication } from '../types';

export async function getAssignments(): Promise<AssignmentWithRemainingDays[]> {
  const response = await fetch(`${BACKEND_URL}/assignments/remaining-days`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getPatients(): Promise<Patient[]> {
  const response = await fetch(`${BACKEND_URL}/patients`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getMedications(): Promise<Medication[]> {
  const response = await fetch(`${BACKEND_URL}/medications`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function createPatient(patient: Omit<Patient, 'id'>): Promise<Patient> {
  const response = await fetch(`${BACKEND_URL}/patients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patient),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function createMedication(medication: Omit<Medication, 'id'>): Promise<Medication> {
  const response = await fetch(`${BACKEND_URL}/medications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(medication),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function createAssignment(assignment: { patientId: number; medicationId: number; startDate: string; numberOfDays: number }): Promise<AssignmentWithRemainingDays> {
  const response = await fetch(`${BACKEND_URL}/assignments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(assignment),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
