import React from 'react';
import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { useAuthContext } from '../../features/auth/AuthContextProvider';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

type TProps = {
  children: React.ReactNode;
} & RouteProps;

export const PrivateRoute: FC<TProps> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated === null) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return isAuthenticated ? children : <Navigate to={'/login'} />;
};
