'use client';

import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Link from 'next/link';
import { useUser } from '../context/UserContext';
import { registerUser } from '../services/userService';
import { useRouter } from 'next/navigation';
import Notification from '../ui/Notification';

export default function RegisterForm() {
  const { setUser } = useUser();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [notification, setNotification] = useState<{ message: string; type?: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false); 

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => /^(?=.*[A-Z])(?=(?:.*\d){2,}).+$/.test(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true); // 👈 activa spinner

    const newErrors: typeof errors = {};
    if (!name) newErrors.name = 'El nombre es obligatorio';
    if (!validateEmail(email)) newErrors.email = 'Email no válido';
    if (!validatePassword(password)) newErrors.password = 'La contraseña debe tener al menos una mayúscula y 2 números';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const user = await registerUser(name, email, password);
      setUser(user);

      setNotification({ message: 'Registro exitoso!', type: 'success' });
      setTimeout(() => {
        setNotification(null);
        router.push('/login');
      }, 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setNotification({ message: err.message, type: 'error' });
      } else {
        setNotification({ message: 'Error desconocido al registrar usuario', type: 'error' });
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="relative w-full max-w-xs mx-auto mt-16">
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-lg bg-[#0a0a0a]/90 border border-gray-700
                   shadow-[4px_4px_10px_rgba(0,0,0,0.6),-2px_-2px_5px_rgba(255,255,255,0.05)]
                   backdrop-blur-md font-mono flex flex-col"
      >
        <h2 className="text-xl font-bold mb-4 text-center text-white tracking-wide
                       drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]">
          Registro
        </h2>

        <div className="mb-3">
          <Input
            label="Nombre"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-[#1a1a1a] text-white border-gray-600 focus:border-white shadow-inner text-sm p-2"
          />
          <p className="text-red-500 text-xs min-h-[1rem]">{errors.name}</p>
        </div>

        <div className="mb-3">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#1a1a1a] text-white border-gray-600 focus:border-white shadow-inner text-sm p-2"
          />
          <p className="text-red-500 text-xs min-h-[1rem]">{errors.email}</p>
        </div>

        <div className="mb-3">
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#1a1a1a] text-white border-gray-600 focus:border-white shadow-inner text-sm p-2"
          />
          <p className="text-red-500 text-xs min-h-[1rem]">{errors.password}</p>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className={`w-full mt-2 bg-gradient-to-b from-gray-800 to-gray-900
                     text-white font-semibold shadow-[2px_2px_8px_rgba(0,0,0,0.7)]
                     hover:translate-y-[-1px] hover:shadow-[4px_4px_10px_rgba(0,0,0,0.8)]
                     transition-transform duration-200 text-sm py-2
                     ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            'Registrarse'
          )}
        </Button>

        <p className="mt-3 text-center text-xs text-gray-400">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-white hover:underline">
            Ingresa aquí
          </Link>
        </p>
      </form>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
