'use client';

import React from 'react';
import { useUser } from '@/components/context/UserContext';
import { FaUserCircle } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { user, setUser } = useUser();
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <p className="text-white text-sm">No hay usuario logueado</p>
      </div>
    );
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
      <div
        className="p-4 rounded-xl bg-[#0a0a0a]/90 border-2 border-gray-700
                   shadow-[6px_6px_10px_rgba(0,0,0,0.5),-3px_-3px_6px_rgba(255,255,255,0.05)]
                   backdrop-blur-md font-mono w-full max-w-xs flex flex-col items-center gap-3"
      >
        {/* Avatar */}
        <FaUserCircle size={60} className="text-gray-400 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]" />

        {/* Name */}
        <h2 className="text-lg font-bold text-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]">
          {user.name}
        </h2>

        {/* Email */}
        <p className="text-gray-300 text-sm">{user.email}</p>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          className="w-full mt-3 bg-gradient-to-b from-gray-800 to-gray-900
                     text-white font-semibold text-sm shadow-[3px_3px_8px_rgba(0,0,0,0.6)]
                     hover:translate-y-[-1px] hover:shadow-[4px_4px_12px_rgba(0,0,0,0.7)]
                     transition-transform duration-200"
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}
