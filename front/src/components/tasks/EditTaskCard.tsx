'use client';
import React, { useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import { Task } from '../types/Itask';

interface EditTaskCardProps {
  task: Task;
  onSave: (data: Partial<Task>) => void; 
  onCancel: () => void;
}

export default function EditTaskCard({ task, onSave, onCancel }: EditTaskCardProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '') return;
    onSave({ title, description });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#202020] text-white rounded-lg p-2 shadow-sm space-y-1 border border-[#333] transition"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-[#111] text-xs text-white rounded-md px-1 py-1 outline-none focus:ring-1 focus:ring-blue-400"
        placeholder="Título"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full bg-[#111] text-xs text-gray-300 rounded-md px-1 py-1 resize-none outline-none focus:ring-1 focus:ring-blue-400"
        placeholder="Descripción"
        rows={2}
      />

      <div className="flex justify-end gap-1">
        <button
          type="button"
          onClick={onCancel}
          className="p-1 rounded-md text-gray-400 hover:text-red-400 transition-colors hover:cursor-pointer"
          title="Cancelar"
        >
          <FiX size={14} />
        </button>
        <button
          type="submit"
          className="p-1 rounded-md text-gray-400 hover:text-orange-500 transition-colors hover:cursor-pointer"
          title="Guardar"
        >
          <FiCheck size={14} />
        </button>
      </div>
    </form>
  );
}
