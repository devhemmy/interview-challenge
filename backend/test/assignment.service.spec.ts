import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentService } from '../src/assignment/assignment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Assignment } from '../src/assignment/entities/assignment.entity';
import { Patient } from '../src/patient/entities/patient.entity';
import { Medication } from '../src/medication/entities/medication.entity';
import { Repository } from 'typeorm';

describe('AssignmentService', () => {
  let service: AssignmentService;
  let assignmentRepository: Repository<Assignment>;
  let patientRepository: Repository<Patient>;
  let medicationRepository: Repository<Medication>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignmentService,
        {
          provide: getRepositoryToken(Assignment),
          useValue: {
            find: jest.fn().mockResolvedValue([]), // Default mock for find
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Patient),
          useValue: {
            findOneBy: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Medication),
          useValue: {
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AssignmentService>(AssignmentService);
    assignmentRepository = module.get<Repository<Assignment>>(
      getRepositoryToken(Assignment),
    );
    patientRepository = module.get<Repository<Patient>>(
      getRepositoryToken(Patient),
    );
    medicationRepository = module.get<Repository<Medication>>(
      getRepositoryToken(Medication),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllWithRemainingDays', () => {
    it('should correctly calculate remaining days for assignments', async () => {
      const RealDate = Date;
      const today = new RealDate('2025-07-13T00:00:00.000Z'); // Set a fixed "today" for testing at midnight
      jest.spyOn(global, 'Date').mockImplementation((dateString) => {
        if (dateString) {
          return new RealDate(dateString);
        }
        return new RealDate(today.getTime()); // Return a new Date object based on the mocked today
      });

      const assignment1 = new Assignment();
      assignment1.startDate = new Date('2025-07-10T12:00:00.000Z'); // 3 days before today
      assignment1.numberOfDays = 10;

      const assignment2 = new Assignment();
      assignment2.startDate = new Date('2025-07-20T12:00:00.000Z'); // 7 days after today
      assignment2.numberOfDays = 0;

      const assignment3 = new Assignment();
      assignment3.startDate = new Date('2025-07-01T12:00:00.000Z'); // In the past
      assignment3.numberOfDays = 5;

      jest
        .spyOn(assignmentRepository, 'find')
        .mockResolvedValueOnce([assignment1, assignment2, assignment3]);

      const result = await service.findAllWithRemainingDays();

      expect(result.length).toBe(3);
      expect(result[0].remainingDays).toBe(7); // (July 10 + 10 days) - July 13 = July 20 - July 13 = 7 days
      expect(result[1].remainingDays).toBe(7); // (July 20 + 0 days) - July 13 = July 20 - July 13 = 7 days
      expect(result[2].remainingDays).toBe(-7); // (July 1 + 5 days) - July 13 = July 6 - July 13 = -7 days

      jest.restoreAllMocks();
    });
  });
});
