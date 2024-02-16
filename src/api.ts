// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
// import { IPartnerAcrticle } from './types';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { ITask } from 'type';

export const initializeAPI = () => {
  // Initialize Firebase
  const app = initializeApp({
    apiKey: 'AIzaSyDYuLrobMCmK73PhY8NEpNs_cfX6q97Q78',
    authDomain: 'karpov-news-4d3e1.firebaseapp.com',
    projectId: 'karpov-news-4d3e1',
    storageBucket: 'karpov-news-4d3e1.appspot.com',
    messagingSenderId: '865900013839',
    appId: '1:865900013839:web:58fecaa5386c57e8b4f67a',
  });

  // Initialize Cloud Firestore and get a reference to the service
  getAuth(app);
  getFirestore(app);
  getStorage(app);

  return app;
};

const tasksCollection = 'tasks';

export const createTask = async (data: Omit<ITask, 'id'>): Promise<any> => {
  const db = getFirestore();

  try {
    await addDoc(collection(db, tasksCollection), { ...data, created: new Date().valueOf().toString() });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateTask = async (id: string, data: Omit<ITask, 'id' | 'created'>): Promise<any> => {
  const db = getFirestore();
  const ref = doc(db, tasksCollection, id);

  try {
    await updateDoc(ref, data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteTask = async (id: string): Promise<any> => {
  const db = getFirestore();
  const ref = doc(db, tasksCollection, id);

  try {
    await deleteDoc(ref);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTasks = async (user: any): Promise<ITask[]> => {
  const db = getFirestore();
  if (user) {
    const querySnapshot = await getDocs(query(collection(db, tasksCollection), where('author', '==', user.email)));
    const tasks: ITask[] = [];

    try {
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<ITask, 'id'>;

        tasks.push({
          id: doc.id,
          ...data,
        });
      });
    } catch (error) {
      return Promise.reject(error);
    }

    return tasks;
  }
  return [];
};
