import { RefObject } from 'react';

export type InputName = 'text';

export interface ITask {
  id: string;
  text: string;
  author: string;
  created?: string;
  done?: boolean;
}

export type InputRefs = {
  text: RefObject<any>;
};

export type InputErrors = {
  text: string;
};
