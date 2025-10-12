'use client';

import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Link from 'next/link';
import { useUser } from '../context/UserContext';
import { loginUser } from '../services/userService';
import { useRouter } from 'next/navigation';
import Notification from '../ui/Notification';
import { FiEye, FiEyeOff } from 'react-icons/fi'; 

export default function LoginForm() {
  const { login } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowNotification(false);
    setLoading(true); // 👈 activa el spinner

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email no válido');
      setShowNotification(true);
      setLoading(false);
      return;
    }

    try {
      const { user, accessToken } = await loginUser(email, password);
      login(user, accessToken);
      router.push('/tasks');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido al iniciar sesión');
      }
      setShowNotification(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-xs mx-auto mt-20">
      {showNotification && error && (
        <Notification
          message={error}
          type="error"
          onClose={() => setShowNotification(false)}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-lg bg-[#0a0a0a]/90 border border-gray-700 
                   shadow-[4px_4px_10px_rgba(0,0,0,0.6),-2px_-2px_5px_rgba(255,255,255,0.05)] 
                   backdrop-blur-md font-mono"
      >
        <h2 className="text-xl font-bold mb-4 text-center text-white tracking-wide 
                       drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]">
          Iniciar sesión
        </h2>

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-[#1a1a1a] text-white border-gray-600 focus:border-white shadow-inner text-sm p-2"
        />

        <div className="relative mt-2">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#1a1a1a] text-white border-gray-600 focus:border-white shadow-inner text-sm p-2"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-[32px] text-gray-400 hover:text-white"
          >
            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        </div>

        <div className="text-center mt-3">
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
              'Ingresar'
            )}
          </Button>
        </div>

        <p className="mt-3 text-center text-xs text-gray-400">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="text-white hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
}
