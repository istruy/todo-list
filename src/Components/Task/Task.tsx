import React, { FC } from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import TripOriginRoundedIcon from '@mui/icons-material/TripOriginRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from '@mui/material/styles';
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';
import './Task.css';
import { ITask } from 'type';
import { theme } from '../../styles';

type TProps = {
  task: ITask;
  onDelete: (id: string) => void;
  onChange: (id: string) => void;
};

export const Task: FC<TProps> = ({ task, onDelete, onChange }) => {
  const onClickTask = () => {
    onChange(task.id);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box component="section" sx={{ maxWidth: 550 }}>
          <Chip
            sx={{
              fontFamily: 'Open Sans',
              fontSize: '16px',
              justifyContent: 'start',
              width: '500px',
              borderRadius: '10px',
              padding: '5px',
              WebkitJustifyContent: 'space-between',
              color: 'white.main',
              backgroundColor: 'backgroundColor.main',
            }}
            onClick={onClickTask}
            className="task-item"
            label={task.text}
            icon={
              task.done ? (
                <ExpandCircleDownRoundedIcon color="secondary" sx={{ width: 20 }} />
              ) : (
                <TripOriginRoundedIcon color="secondary" sx={{ width: 20 }} />
              )
            }
            deleteIcon={<DeleteIcon sx={{ fill: '#A5FEB4', width: 20 }} />}
            onDelete={() => onDelete(task.id)}
          />
        </Box>
      </ThemeProvider>
    </div>
  );
};
