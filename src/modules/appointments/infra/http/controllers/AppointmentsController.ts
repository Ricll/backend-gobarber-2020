import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body; // rota de postagem: profissional e data

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    // Execucao do service
    const appointment = await createAppointment.excecute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  }
}
