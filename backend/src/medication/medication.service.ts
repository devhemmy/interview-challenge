import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medication } from './entities/medication.entity';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(Medication)
    private readonly medicationRepository: Repository<Medication>,
  ) {}

  create(createMedicationDto: CreateMedicationDto): Promise<Medication> {
    const medication = this.medicationRepository.create(createMedicationDto);
    return this.medicationRepository.save(medication);
  }

  findAll(): Promise<Medication[]> {
    return this.medicationRepository.find();
  }

  async findOne(id: number): Promise<Medication> {
    const medication = await this.medicationRepository.findOneBy({ id });
    if (!medication) {
      throw new NotFoundException(`Medication with ID "${id}" not found`);
    }
    return medication;
  }

  async update(
    id: number,
    updateMedicationDto: UpdateMedicationDto,
  ): Promise<Medication> {
    const medication = await this.findOne(id);
    const updated = this.medicationRepository.merge(
      medication,
      updateMedicationDto,
    );
    return this.medicationRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result = await this.medicationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Medication with ID "${id}" not found`);
    }
  }
}
