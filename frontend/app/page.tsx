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
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Patient Management System</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <CreatePatientForm />
        <CreateMedicationForm />
        <CreateAssignmentForm />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Patient Treatment Dashboard</h2>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
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
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors duration-200"
          >
            Refresh Assignments
          </button>
        </div>

        {assignments.length === 0 ? (
          <p className="text-gray-700">No assignments found. Create new patients, medications, and assignments above.</p>
        ) : (
          <ul className="space-y-4">
            {assignments.map((assignment) => (
              <li key={assignment.id} className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
                <p className="text-lg font-semibold text-gray-900">Patient: {assignment.patient.name}</p>
                <p className="text-gray-800">Medication: {assignment.medication.name} ({assignment.medication.dosage})</p>
                <p className="text-gray-800">Frequency: {assignment.medication.frequency}</p>
                <p className="text-gray-800">Remaining Days: <span className="font-bold text-blue-700">{assignment.remainingDays}</span></p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}