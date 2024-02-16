import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { LoginContainer } from '../../features/auth/login/LoginContainer';
import { Page } from '@components/Page/Page';
import { TasksList } from '@components/TasksList/TasksList';
import '../../common.css';
import { PrivateRoute } from '@components/PrivateRoute/PrivateRoute';

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Page>
            <LoginContainer />
          </Page>
        }
      ></Route>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Page>
              <TasksList />
            </Page>
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
};

export default App;
