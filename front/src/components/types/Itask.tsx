export type TaskStatus = 'Pendiente' | 'En curso' | 'Terminada';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
}