'use client';

import React from 'react';
import { Task } from '../types/Itask';
import Button from '../ui/Button';

interface TaskItemProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
  return (
    <div className="p-4 border rounded flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        {task.description && <p className="text-gray-600">{task.description}</p>}
      </div>
      <div className="flex space-x-2">
        <Button onClick={onEdit}>Editar</Button>
        <Button onClick={onDelete} className="bg-red-500 hover:bg-red-600">Eliminar</Button>
      </div>
    </div>
  );
}
