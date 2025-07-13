# Project Rules for Patient Management App

## Overall Architecture
- We are building a backend with NestJS and a frontend with Next.js.
- The database is SQLite, managed by TypeORM.
- All code must be in TypeScript.

## Backend (NestJS) Rules
1.  **Entities**:
    - Use TypeORM decorators (`@Entity()`, `@Column()`, `@PrimaryGeneratedColumn()`, `@ManyToOne`, etc.).
    - All entities should be in their own `entities` subfolder (e.g., `src/patient/entities/patient.entity.ts`).
2.  **DTOs (Data Transfer Objects)**:
    - Use DTOs for API request and response bodies.
    - Use `class-validator` decorators (`@IsString()`, `@IsNotEmpty()`, `@IsDateString()`, etc.) for input validation in Create/Update DTOs.
3.  **Controllers**:
    - Route paths should be kebab-case (e.g., `/patients`, `/medications`).
    - Use proper HTTP methods (POST, GET, PATCH, DELETE).
    - Endpoints must validate input using DTOs.
4.  **Services**:
    - Contain all business logic.
    - Interact with the TypeORM repository.
    - Must be cleanly separated from the controller layer.
5.  **Testing**:
    - Unit tests are required for core business logic, especially calculations.