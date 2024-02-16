import { Box, Stack } from '@mui/material';
import React, { FC } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../styles';
import './LoginForm.css';

export type TLoginField = {
  name: string;
  error?: boolean;
  helper?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type TProps = {
  className?: string;
  email: TLoginField;
  password: TLoginField;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const LoginForm: FC<TProps> = ({ className, email, password, onSubmit }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box className={className} sx={{ width: '250px' }}>
        <form onSubmit={onSubmit} method="POST">
          <Stack direction="column" spacing={2}>
            <Typography
              variant="h6"
              gutterBottom
              className="login-form__header"
              sx={{ margin: '15px', color: 'white' }}
            >
              Вход
            </Typography>
            <TextField
              sx={{
                '& input': { color: 'white.main' },
                '& .MuiOutlinedInput-root': { borderRadius: '10px', borderColor: 'greyActive.main' },
                '& fieldset': { borderColor: 'greyActive.main' },
              }}
              color="secondary"
              id="outlined-basic"
              variant="outlined"
              className="input-login"
              fullWidth
              label={email.name}
              name={email.name}
              value={email.value}
              onChange={email.onChange}
              error={!!email.error}
              helperText={email.helper}
            />
            <TextField
              id="outlined-basic"
              sx={{
                '& input': { color: 'white.main' },
                '& .MuiOutlinedInput-root': { borderRadius: '10px', borderColor: 'greyActive.main' },
                '& fieldset': { borderColor: 'greyActive.main' },
              }}
              color="secondary"
              variant="outlined"
              className="input-login"
              fullWidth
              type="password"
              label={password.name}
              name={password.name}
              value={password.value}
              onChange={password.onChange}
              error={!!password.error}
              helperText={password.helper}
            />
            <Button
              className="login-form__button"
              sx={{ borderRadius: '10px' }}
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
            >
              Войти
            </Button>
          </Stack>
        </form>
      </Box>
    </ThemeProvider>
  );
};
