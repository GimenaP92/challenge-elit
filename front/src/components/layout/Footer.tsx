'use client';

import React from 'react';
import { FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] w-full py-2 text-center text-gray-400 flex justify-center items-center gap-1">
      <span className="italic text-sm">
        By Gimena Pascuale for Elit SA Challenge
      </span>
      <a
        href="https://www.linkedin.com/in/gimena-pascuale/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <FaLinkedin size={16} />
      </a>
    </footer>
  );
}
