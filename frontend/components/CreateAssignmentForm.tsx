"use client";

import { useState, useEffect } from 'react';
import { getPatients, getMedications, createAssignment } from '../services/api';
import { Patient, Medication } from '../types';

export default function CreateAssignmentForm() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<number | ''>('');
  const [selectedMedicationId, setSelectedMedicationId] = useState<number | ''>('');
  const [startDate, setStartDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState<number | ''>('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsData = await getPatients();
        setPatients(patientsData);
        const medicationsData = await getMedications();
        setMedications(medicationsData);
      } catch (err) {
        setError('Failed to fetch patients or medications.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!selectedPatientId || !selectedMedicationId || !startDate || !numberOfDays) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const newAssignment = await createAssignment({
        patientId: Number(selectedPatientId),
        medicationId: Number(selectedMedicationId),
        startDate,
        numberOfDays: Number(numberOfDays),
      });
      setMessage(`Assignment created for ${newAssignment.patient.name} with ${newAssignment.medication.name}`);
      setSelectedPatientId('');
      setSelectedMedicationId('');
      setStartDate('');
      setNumberOfDays('');
    } catch (error) {
      setMessage('Failed to create assignment.');
      console.error(error);
    }
  };

  if (loading) {
    return <div className="p-4 border rounded-lg shadow-sm bg-white mb-6">Loading form data...</div>;
  }

  if (error) {
    return <div className="p-4 border rounded-lg shadow-sm bg-white mb-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Assignment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="patientSelect" className="block text-sm font-medium text-gray-700">Patient</label>
          <select
            id="patientSelect"
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 placeholder-gray-500"
            required
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="medicationSelect" className="block text-sm font-medium text-gray-700">Medication</label>
          <select
            id="medicationSelect"
            value={selectedMedicationId}
            onChange={(e) => setSelectedMedicationId(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 placeholder-gray-500"
            required
          >
            <option value="">Select a medication</option>
            {medications.map((medication) => (
              <option key={medication.id} value={medication.id}>
                {medication.name} ({medication.dosage})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 placeholder-gray-500"
            required
          />
        </div>
        <div>
          <label htmlFor="numberOfDays" className="block text-sm font-medium text-gray-700">Number of Days</label>
          <input
            type="number"
            id="numberOfDays"
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 placeholder-gray-500"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Assignment
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
