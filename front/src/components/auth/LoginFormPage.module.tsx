import React from 'react';
import { useNavigate } from 'react-router';
import { useAnyUsersQuery } from '../../queries';
import { useAuth } from './AuthContext';
import LoginForm from './LoginForm';
import styles from './LoginFormPage.module.scss';

const LoginFormPage =()=> {
  const anyUsersQuery = useAnyUsersQuery();
  const auth = useAuth()!;
  const navigate = useNavigate();

  if (auth.token != null) {
    navigate('/');
  }

  if (anyUsersQuery.status !== 'success') {
    return <p>Loading...</p>;
  }

  if (anyUsersQuery.data === false) {
    navigate('/first-user');
  }

  return (
    <div className={styles.login}>
      <LoginForm></LoginForm>
    </div>
  );
}

export default LoginFormPage;