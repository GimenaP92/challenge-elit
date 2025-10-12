'use client';
import React, { useState } from 'react';
import { FiEdit2, FiTrash, FiPlus } from 'react-icons/fi';
import { Task } from '../types/Itask';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onChangeStatus: (newStatus: string) => void;
  statusOptions: string[];
}

export default function TaskCard({ task, onEdit, onDelete, onChangeStatus, statusOptions }: TaskCardProps) {
  const [showStatusSelect, setShowStatusSelect] = useState(false); 

  return (
    <div className="bg-[#1a1a1a] text-white rounded-xl p-3 shadow-md hover:shadow-lg transition-shadow duration-200 hover:border-2 hover:border-orange-500">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-sm leading-tight">{task.title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowStatusSelect(!showStatusSelect)}
            className="text-gray-300 hover:text-green-400 transition-colors hover:cursor-pointer"
            title="Cambiar estado"
          >
            <FiPlus size={16} />
          </button>
          <button
            onClick={onEdit}
            className="text-gray-300 hover:text-blue-400 transition-colors hover:cursor-pointer"
            title="Editar"
          >
            <FiEdit2 size={16} />
          </button>
          <button
            onClick={onDelete}
            className="text-gray-300 hover:text-red-400 transition-colors hover:cursor-pointer"
            title="Eliminar"
          >
            <FiTrash size={16} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-xs mt-2 text-gray-400 line-clamp-3">{task.description}</p>
      )}


     {showStatusSelect && (
          <div className="mt-2">
            <select
              value={task.status}
              onChange={(e) => {
                onChangeStatus(e.target.value); 
                setShowStatusSelect(false); 
              }}
              className="bg-[#1a1a1a] text-white border border-gray-600 rounded rounded-md px-2 py-1 text-xs hover:cursor-pointer"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        )}
    </div>
  );
}
