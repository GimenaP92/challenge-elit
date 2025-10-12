'use client';

import React, { useEffect } from 'react';
import { AiFillAliwangwang } from 'react-icons/ai';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  onClose?: () => void;
}

export default function Notification({
  message,
  type = 'success',
  duration = 3000,
  onClose,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose && onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div
      className={`fixed top-20 right-4 ${bgColor} text-white px-4 py-2 rounded shadow-lg z-50 flex items-center gap-2`}
    >
      <AiFillAliwangwang size={20} />
      <span>{message}</span>
    </div>
  );
}
