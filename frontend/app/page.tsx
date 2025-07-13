"use client";

import { useEffect, useState } from 'react';
import { getAssignments } from '../services/api';
import { AssignmentWithRemainingDays } from '../types';
import CreatePatientForm from '../components/CreatePatientForm';
import CreateMedicationForm from '../components/CreateMedicationForm';
import CreateAssignmentForm from '../components/CreateAssignmentForm';

export default function Home() {
  const [assignments, setAssignments] = useState<AssignmentWithRemainingDays[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignmentsData = async () => {
      try {
        const data = await getAssignments();
        setAssignments(data);
      } catch (err) {
        setError('Failed to fetch assignments.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignmentsData();
  }, []);

  if (loading) {
    return <div className="p-8 font-sans">Loading assignments...</div>;
  }

  if (error) {
    return <div className="p-8 font-sans text-red-500">{error}</div>;
  }

  return (
    <div className="p-8 font-sans">
      <CreatePatientForm />
      <CreateMedicationForm />
      <CreateAssignmentForm />
      <h1 className="text-2xl font-bold mb-4">Patient Treatment Dashboard</h1>

      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <ul className="space-y-4">
          {assignments.map((assignment) => (
            <li key={assignment.id} className="p-4 border rounded-lg shadow-sm bg-white">
              <p className="text-lg font-semibold">{assignment.patient.name}</p>
              <p className="text-gray-700">Medication: {assignment.medication.name}</p>
              <p className="text-gray-700">Remaining Days: {assignment.remainingDays}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}