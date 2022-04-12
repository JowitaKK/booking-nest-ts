import { AppointmentDto } from "../../api";
import { Barber, barberFormDto } from './Barber';
import { BarberService, barberServiceFromDto  } from './Barber';

export interface Appointment {
    id: number;
    barber: Barber;
    barberService: BarberService;
    dateTime: Date;
    clientName: string;
    clientPhoneNumber: string;
}

export const appointmentFromDto = (dto: AppointmentDto) => {
    const appointment: Appointment = {
        id: dto.id,
        barber: barberFormDto(dto.barber),
        barberService: barberServiceFromDto(dto.barberService),
        dateTime: new Date(dto.datetime),
        clientName: dto.clientName,
        clientPhoneNumber: dto.clientPhoneNumber,
    };
    return appointment;
}