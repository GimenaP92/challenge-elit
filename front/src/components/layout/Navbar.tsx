'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';

export default function Navbar() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    setOpenMenu(false);
    router.push('/');
  };

  const handleProfile = () => {
    router.push('/profile');
    setOpenMenu(false); 
  };

  return (
    <nav className="bg-[#0a0a0a] text-white px-2 py-2 flex justify-end items-center relative text-sm sm:text-base">
      <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
        {user ? (
          <>
            <Link
              href="/tasks"
              className="bg-orange-500 px-2 py-1 rounded hover:text-gray-200 hover:cursor-pointer text-xs sm:text-sm"
            >
              Tablero
            </Link>

            <div className="relative">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="bg-orange-500 p-1 rounded hover:text-gray-200 hover:cursor-pointer"
              >
                <FiUser size={16} />
              </button>

             {openMenu && (
            <div className="absolute right-0 mt-1 min-w-max bg-[#0a0a0a]/90 border-2 border-gray-800 rounded shadow-lg z-50 flex flex-col">
              <button
                onClick={handleProfile}
                className="w-full flex items-center gap-1 px-3 py-1 bg-gray-900 hover:bg-gray-700 hover:cursor-pointer rounded-t-sm text-xs sm:text-sm transition-colors whitespace-nowrap"
              >
                <FaUser size={14} /> Mi Perfil
              </button>
              <hr className="border-gray-700 m-0" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-1 px-3 py-1 bg-gray-900 hover:bg-gray-700 hover:cursor-pointer rounded-b-sm text-xs sm:text-sm transition-colors whitespace-nowrap"
              >
                <FiLogOut size={14} /> Cerrar sesión
              </button>
            </div>
          )}
            </div>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-orange-500 px-2 py-1 rounded hover:text-gray-300 hover:cursor-pointer font-mono text-xs sm:text-sm"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
