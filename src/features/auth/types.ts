import { UserCredential } from 'firebase/auth';

export type TLoginWithEmailAndPasswordResult = UserCredential;

export type TAuthContext = {
  // boolean - определенное состояние. null - неизвестное (загрузка)
  isAuthenticated: boolean | null;
  user?: any;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<TLoginWithEmailAndPasswordResult>;
  logOut: () => void;
  loginWithPopup: (provider: string) => Promise<TLoginWithEmailAndPasswordResult>;
};
