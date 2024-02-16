import React, { FC, useState, useEffect } from 'react';
import { deleteTask, getTasks } from '../../api';
import { ITask } from 'type';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import { Task } from '@components/Task/Task';
import { Stack } from '@mui/material';
import { IconButton } from '@mui/material';
import { useAuthContext } from '../../features/auth/AuthContextProvider';
import { ModalWindowTask } from '@components/ModalWindowTask/ModalWindowTask';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import { ThemeProvider } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles';
import './TasksList.css';

export const TasksList: FC = () => {
  const { user } = useAuthContext();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [open, setOpen] = useState(false);
  const [openedTask, setOpenedTask] = useState<string>('');

  const handleCreateTask = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const { logOut } = useAuthContext();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    logOut();
    navigate('/login');
  };

  useEffect(() => {
    if (!tasks.find((item) => item.done)) {
      getTasks(user).then((response: ITask[]) => setTasks(response));
    }
  }, [open, user]);

  const onDeleteTask = (id: string) => {
    deleteTask(id)
      .then(() => getTasks(user))
      .then((response: ITask[]) => setTasks(response));
  };

  const onChange = (id: string) => {
    handleCreateTask();
    setOpenedTask(id);
  };

  const onDoneClick = (id: string) => {
    const item = tasks.map((item) => {
      if (item.id === id) {
        return { ...item, done: true };
      }
      return { ...item };
    });
    setTasks([...item]);
    setTimeout(() => {
      deleteTask(id)
        .then(() => getTasks(user))
        .then((response: ITask[]) => setTasks(response));
    }, 2000);
  };

  const onCloseWindow = () => {
    handleCloseModal();
    setOpenedTask('');
  };

  const getTaskById = () => {
    const resultTask = tasks.find((item) => item.id === openedTask);
    return resultTask ? resultTask : null;
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="tasks-list-container">
          <Grid container spacing={2}>
            <Grid xs={10} sx={{ display: 'flex' }}>
              <Typography variant="h6" gutterBottom className="task-list__header" sx={{ margin: '15px' }}>
                Список дел
              </Typography>
              <IconButton onClick={onLogoutClick}>
                <LogoutIcon color="secondary" sx={{ '&:hover': { color: 'secondary' } }} />
              </IconButton>
            </Grid>
            <Grid xs={2}>
              <IconButton
                onClick={handleCreateTask}
                sx={{
                  margin: '15px 0 0 20px',
                  backgroundColor: '#A5FEB4',
                  padding: '12px',
                  '&:hover': { fill: '#A5FEB4' },
                }}
              >
                <PlaylistAddRoundedIcon sx={{ '&:hover': { fill: '#A5FEB4' } }} />
              </IconButton>
              <Paper elevation={3} />
            </Grid>
          </Grid>
          <Box component="section" className="tasks-list__items">
            {tasks.length > 0 ? (
              <Stack spacing={2} sx={{ marginTop: '20px' }}>
                {tasks.map((item) => (
                  <Task task={item} key={item.id} onDelete={onDeleteTask} onChange={onChange} />
                ))}
              </Stack>
            ) : (
              <Typography
                variant="body2"
                gutterBottom
                color="#ABAEB8"
                sx={{ ml: 'auto', mr: 'auto', width: '200px', mt: '150px', textAlign: 'center' }}
              >
                Чтобы создать задачу, нажмите на значок в правом верхнем углу
              </Typography>
            )}
          </Box>
        </div>
        <ModalWindowTask open={open} handleClose={onCloseWindow} task={getTaskById()} onDoneClick={onDoneClick} />
      </ThemeProvider>
    </>
  );
};
