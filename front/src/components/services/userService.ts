import { User } from "../types/Iuser";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export async function registerUser(name: string, email: string, password: string): Promise<User> {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Error registrando usuario');
  }

  return res.json() as Promise<User>; 
}

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Error al iniciar sesión');

  const data = await res.json();


  return { 
    user: data.user, 
    accessToken: data.access_token 
  };
};

