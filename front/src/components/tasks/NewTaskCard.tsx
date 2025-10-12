'use client';
import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

interface NewTaskCardProps {
  onSubmit: (title: string, description?: string) => void;
}

export default function NewTaskCard({ onSubmit }: NewTaskCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title, description);
    setTitle('');
    setDescription('');
    setIsOpen(false);
  };

  return (
    <div className="bg-[#202020] text-white rounded-md shadow hover:shadow-lg transition-all p-2 mb-3">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center gap-1 py-3 border-2 border-dashed border-gray-600 rounded-md hover:border-gray-400 transition hover:cursor-pointer text-sm"
        >
          <FiPlus size={14} />
          Nueva tarea
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-1 bg-[#202020]">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título de la tarea"
            className="bg-[#111] text-white p-1 rounded-md text-xs outline-none focus:ring-1 focus:ring-orange-500"
            autoFocus
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción (opcional)"
            className="bg-[#111] text-white p-1 rounded-md text-xs resize-none outline-none focus:ring-1 focus:ring-orange-500"
            rows={2}
          />
          <div className="flex justify-end gap-1 mt-1">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-300 text-xs hover:text-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 py-1 rounded-md transition"
            >
              Crear
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
