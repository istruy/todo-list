import { LoginForm, TLoginField } from '@components/LoginForm/LoginForm';
import React, { FC, Reducer, useReducer, useState } from 'react';
import { Typography } from '@mui/material';
import { validateEmail } from './utils';
import { ALLOWED_OAUTH_PROVIDER, useAuthContext } from '../AuthContextProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import { ProviderId } from '@firebase/auth';
import { TLoginWithEmailAndPasswordResult } from '../types';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../styles';
import Alert from '@mui/material/Alert';
import './LoginContainer.css';

type TLoginFormFieldState = Omit<TLoginField, 'onChange'>;

type Action = { type: 'change' | 'error'; value: string };

const getOauthProviderIcon = (provider: string) => {
  switch (provider) {
    case ProviderId.GOOGLE:
      return <GoogleIcon fontSize="inherit" color="secondary" />;
  }
};

function reducer(state: TLoginFormFieldState, action: Action): TLoginFormFieldState {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        error: false,
        helper: '',
        value: action.value,
      };
    case 'error':
      return {
        ...state,
        error: true,
        helper: action.value,
      };
    default:
      throw new Error();
  }
}

export const LoginContainer: FC = () => {
  const navigate = useNavigate();
  const { state: locationState } = useLocation();
  const { loginWithEmailAndPassword, loginWithPopup } = useAuthContext();
  const [authError, setAuthError] = useState('');
  const [emailState, dispatchEmail] = useReducer<Reducer<TLoginFormFieldState, Action>>(reducer, {
    name: '',
    value: '',
  });
  const [passwordState, dispatchPassword] = useReducer<Reducer<TLoginFormFieldState, Action>>(reducer, {
    name: '',
    value: '',
  });

  const processLogin = (promise: Promise<TLoginWithEmailAndPasswordResult>): void => {
    promise
      .then(() => {
        navigate(locationState?.from || '/');
      })
      .catch((error) => {
        setAuthError(error?.message || 'error');
      });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valid = true;
    if (!validateEmail(emailState.value)) {
      dispatchEmail({
        type: 'error',
        value: 'Введите корректный email',
      });
      valid = false;
    }

    if (passwordState.value.length <= 6) {
      dispatchPassword({
        type: 'error',
        value: 'Длинна пароля меньше 6-ти символов',
      });
      valid = false;
    }

    if (valid) {
      processLogin(loginWithEmailAndPassword(emailState.value, passwordState.value));
    }
  };

  const onOauthCLick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const dataset = (e.target as HTMLElement)?.closest<HTMLLinkElement>('.login-oauth-container__item')?.dataset;

    if (dataset?.providerId) {
      processLogin(loginWithPopup(dataset?.providerId));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="login-container">
        {authError && (
          <Typography variant="subtitle2" color="error" sx={{ m: 2 }}>
            {authError}
          </Typography>
        )}
        <div className="login-form">
          <LoginForm
            email={{
              ...emailState,
              onChange: (e) => dispatchEmail({ type: 'change', value: e.target.value }),
            }}
            password={{
              ...passwordState,
              onChange: (e) => dispatchPassword({ type: 'change', value: e.target.value }),
            }}
            onSubmit={onSubmit}
          />
          <div className="login-oauth-container">
            {Object.keys(ALLOWED_OAUTH_PROVIDER).map((key) => {
              return (
                <Link
                  to="#"
                  className="login-oauth-container__item"
                  data-provider-id={key}
                  key={key}
                  onClick={onOauthCLick}
                >
                  {getOauthProviderIcon(key)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <Alert severity="info">
        Пользователь с админ правами - логин: admin@admin.ru, пароль: admin12345 (регистрация не реализована)
      </Alert>
    </ThemeProvider>
  );
};
