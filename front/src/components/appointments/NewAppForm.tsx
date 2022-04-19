import { Form, Formik } from 'formik';

import { useCreateAppointmentMutation, useGetBarberServicesQuery, useGetBarbersQuery } from '../../queries';
import { Button, InputLabel, Select, MenuItem, TextField } from '@mui/material';
// import DatetimeInput from '../common/DatetimeInput';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

interface NewAppointmentFormValues {
  barberId: string | null;
  barberServiceId: string | null;
  datetime: Date;
  clientName: string;
  clientPhoneNumber: string;
}

export const NewAppointmentForm =()=> {
  const barbersQuery = useGetBarbersQuery();
  const barberServicesQuery = useGetBarberServicesQuery();
  const createAppointmentMutation = useCreateAppointmentMutation();

  const navigate = useNavigate();

  if (barbersQuery.status !== 'success' || barberServicesQuery.status !== 'success') {
    return <p>Loading...</p>;
  }

  const initialValues: NewAppointmentFormValues = {
    barberId: null,
    barberServiceId: null,
    datetime: new Date(),
    clientName: '',
    clientPhoneNumber: '',
  };

  const validationSchema: Yup.SchemaOf<NewAppointmentFormValues> = Yup.object({
    barberId: Yup.string().required('Please select the barber'),
    barberServiceId: Yup.string().required('Please select the service'),
    datetime: Yup.date().required('Please select the date'),
    clientName: Yup.string().required("Please enter client's name"),
    clientPhoneNumber: Yup.string().required("Please enter client's phone number"),
  });

  const handleSubmit = async (values: NewAppointmentFormValues) => {
    if (values.barberId == null) return;
    if (values.barberServiceId == null) return;

    await createAppointmentMutation.mutateAsync({
      barberId: parseInt(values.barberId),
      barberServiceId: parseInt(values.barberServiceId),
      datetime: values.datetime.toISOString(),
      clientName: values.clientName,
      clientPhoneNumber: values.clientPhoneNumber,
    });

    navigate('/appointments');
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <InputLabel>
          <Select name="barberId" label="Barber">

            {barbersQuery.data.map((barber) => (
              <MenuItem value={barber.id}>{barber.name}</MenuItem>
            ))}
          </Select>
        </InputLabel>
        <InputLabel>
          <Select name="barberServiceId" label="Service">
            
            {barberServicesQuery.data.map((barberService) => (
              <MenuItem value={barberService.id}>{barberService.name}</MenuItem>
            ))}
          </Select>
        </InputLabel>
        <InputLabel>
          {/* <DatetimeInput label="Date and Time" name="datetime"></DatetimeInput> */}
        </InputLabel>
        <InputLabel>
          <TextField label="Client's name" name="clientName"/>
        </InputLabel>
        <InputLabel>
          <TextField label="Client's phone number" name="clientPhoneNumber"/>
        </InputLabel>
        <Button type="submit" variant="contained">
          New Appointment
        </Button>
      </Form>
    </Formik>
  )}
  export default NewAppointmentForm;

