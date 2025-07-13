# Frontend Rules for Patient Management App

## Overall Architecture

- We are building a frontend with Next.js (using the App Router) and React.
- All code must be in TypeScript.
- All styling must be done with Tailwind CSS.

## API Communication

1.  **Centralized API Logic**: All calls to the backend must be located in `services/api.ts`.
2.  **Backend URL**: The base URL for the backend (`http://localhost:8080`) must be defined as an exported constant named `BACKEND_URL` in a `lib/constants.ts` file.
3.  **Data Types**: Define TypeScript interfaces for all API data structures in a single `types/index.ts` file. These types must be used for all data fetched from the API. The core types are:
    - `Patient`: { id: number; name: string; dateOfBirth: string; }
    - `Medication`: { id: number; name: string; dosage: string; frequency: string; }
    - `AssignmentWithRemainingDays`: { id: number; startDate: string; numberOfDays: number; patient: Patient; medication: Medication; remainingDays: number; }

## Component Structure

1.  **Pages**: Main pages will be created as `page.tsx` files within the `app` directory (e.g., `app/page.tsx`).
2.  **Reusable Components**: Create smaller, reusable components inside a `components` directory (e.g., `components/PatientCard.tsx`).
3.  **Client Components**: Use the `"use client";` directive at the top of any component that uses hooks like `useState` or `useEffect`. Fetching data is typically done in client components to handle loading and error states.

## Code Style

- Use functional components with React Hooks.
- Ensure clear and readable JSX.
