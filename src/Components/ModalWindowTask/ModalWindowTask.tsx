import React, { ChangeEvent, FC, useState, useRef, FormEvent, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ITask, InputErrors, InputName, InputRefs } from 'type';
import { createTask, updateTask } from '../../api';
import { useAuthContext } from '../../features/auth/AuthContextProvider';
import { ThemeProvider } from '@mui/material/styles';
import { getErrors } from '../../helpers';
import { theme } from '../../styles';

type TProps = {
  open: boolean;
  handleClose: () => void;
  task: ITask | null;
  onDoneClick: (id: string) => void;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'white.main',
  boxShadow: 24,
  p: 4,
};

export const ModalWindowTask: FC<TProps> = ({ open, handleClose, task, onDoneClick }) => {
  const { user } = useAuthContext();
  const [inputErrors, setInputErrors] = useState<InputErrors>({ text: '' });
  const [inputValues, setInputValues] = useState<Omit<ITask, 'id' | 'done'>>({
    text: '',
    author: user ? user.email : '',
    created: '0',
  });
  const inputRefs: InputRefs = { text: useRef<HTMLTextAreaElement>() };

  useEffect(() => {
    setInputValues({
      ...inputValues,
      text: task ? task.text : '',
      author: user ? user.email : '',
    });
  }, [task, user]);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = event.currentTarget;
    const name = input.name;
    const value = input.value;

    setInputValues({
      ...inputValues,
      [name]: value,
    });

    setInputErrors({ text: '' } as InputErrors);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: { [key: string]: string } = {};
    data['text'] = inputValues.text;

    const errors = getErrors(data);
    const errorsEntries = Object.entries(errors);

    setInputErrors(errors);

    const errorInput = errorsEntries.find(([, value]) => value.length > 0);

    if (errorInput) {
      const name = errorInput[0] as InputName;
      const inputRef = inputRefs[name];

      if (inputRef.current) {
        inputRef.current.focus();
      }

      return;
    }

    if (task) {
      updateTask(task.id, inputValues);
    } else {
      createTask(inputValues);
    }

    setInputValues({
      ...inputValues,
      text: '',
    });

    handleClose();
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ '& form': { borderRadius: '15px' } }}
    >
      <ThemeProvider theme={theme}>
        <Box sx={style} onSubmit={onSubmit} component="form">
          <Grid container rowSpacing={2} sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
            <Grid xs={12} sx={{ display: 'flex', WebkitJustifyContent: 'space-between' }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Создать новую задачу
              </Typography>
              <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
            </Grid>
            <TextField
              fullWidth
              label="Текст задачи"
              variant="outlined"
              name="text"
              value={inputValues.text}
              onChange={onChangeInput}
              ref={inputRefs.text}
              error={Boolean(inputErrors.text.length)}
              helperText={inputErrors.text}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
            />
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ color: 'secondary' }}>
              {task ? 'Сохранить' : 'Создать'}
            </Button>
            {task && (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ borderRadius: '10px' }}
                onClick={() => onDoneClick(task.id)}
              >
                Задача выполнена
              </Button>
            )}
          </Grid>
        </Box>
      </ThemeProvider>
    </Modal>
  );
};
