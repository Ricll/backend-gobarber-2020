import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.excecute({
      date: new Date(),
      provider_id: '1211111',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1211111');
  });

  it('should not be able to create two appointments at same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.excecute({
      date: appointmentDate,
      provider_id: '1211111',
    });
    await expect(
      createAppointment.excecute({
        date: appointmentDate,
        provider_id: '1211111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
