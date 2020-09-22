import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../entities/Appointment'; // Modelo dos dados recebidos

class AppointmentsRepository implements IAppointmentsRepository {
  private omrRepository: Repository<Appointment>;

  constructor() {
    this.omrRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.omrRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.omrRepository.create({ provider_id, date });

    await this.omrRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
