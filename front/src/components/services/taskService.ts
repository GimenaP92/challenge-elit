import { Task } from '../types/Itask';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


const getToken = () => localStorage.getItem('token') || '';

export const getTasksByUserId = async (userId: string): Promise<Task[]> => {
  const res = await fetch(`${BASE_URL}/tasks/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error('Error al obtener tareas');
  return res.json();
};


export const createTask = async (
  userId: string,
  task: Omit<Task, 'id' | 'userId'>
): Promise<Task> => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...task, userId }), 
  });

  if (!res.ok) throw new Error('Error al crear tarea');
  return res.json();
};


export const updateTask = async (taskId: string, task: Partial<Omit<Task, 'id' | 'userId'>>): Promise<Task> => {
  const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(task),
  });

  if (!res.ok) throw new Error('Error al actualizar tarea');

  return res.json();
};

export const deleteTask = async (taskId: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) throw new Error('Error al eliminar tarea');
};
