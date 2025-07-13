"use client";

import { useState } from 'react';
import { createPatient } from '../services/api';

export default function CreatePatientForm() {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const newPatient = await createPatient({ name, dateOfBirth });
      setMessage(`Patient ${newPatient.name} created with ID: ${newPatient.id}`);
      setName('');
      setDateOfBirth('');
    } catch (error) {
      setMessage('Failed to create patient.');
      console.error(error);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 placeholder-gray-500"
            required
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900 placeholder-gray-500"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Patient
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
