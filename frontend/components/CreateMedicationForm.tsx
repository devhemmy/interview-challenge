"use client";

import { useState } from 'react';
import { createMedication } from '../services/api';

export default function CreateMedicationForm() {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const newMedication = await createMedication({ name, dosage, frequency });
      setMessage(`Medication ${newMedication.name} created with ID: ${newMedication.id}`);
      setName('');
      setDosage('');
      setFrequency('');
    } catch (error) {
      setMessage('Failed to create medication.');
      console.error(error);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white mb-6">
      <h2 className="text-xl font-bold mb-4">Create New Medication</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="medicationName" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="medicationName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">Dosage</label>
          <input
            type="text"
            id="dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">Frequency</label>
          <input
            type="text"
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Medication
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
