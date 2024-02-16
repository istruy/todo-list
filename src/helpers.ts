import { InputErrors } from 'type';

export const getErrors = (data: { [key: string]: string }): InputErrors => {
  const errors: InputErrors = {
    text: '',
  };

  const value = Object.values(data)[0];
  const field = Object.keys(errors)[0];

  if (value.length === 0) {
    errors[field as keyof InputErrors] = 'Поле не может быть пустым';
  }

  if (value.length > 100) {
    errors[field as keyof InputErrors] = 'Длина задачи не должна превышать 100 символов';
  }

  return errors;
};
