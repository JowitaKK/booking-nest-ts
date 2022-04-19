import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api';
import { Button, TextField} from '@mui/material'
import { useAuth } from './AuthContext';
import * as Yup from 'yup';

interface LoginFormValues {
  username: string;
  password: string;
}
const LoginForm = ()=> {
  const auth = useAuth()!;
  const navigate = useNavigate();

  const initialValues: LoginFormValues = {
    username: '',
    password: '',
  };

  const validationSchema: Yup.SchemaOf<LoginFormValues> = Yup.object({
    username: Yup.string().required('Username cannot be empty'),
    password: Yup.string().required('Password cannot be empty'),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    const token = await login({ username: values.username, password: values.password });
    if (token != null) {
      auth.login(token);
      navigate('/');
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
          <TextField label="Username" name="username"></TextField>
          <TextField label="Password" name="password"></TextField>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Form>
    </Formik>
  );
}

export default LoginForm;