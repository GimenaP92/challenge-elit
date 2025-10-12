import { Task } from "./Itask";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  tasks: Task[];
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}