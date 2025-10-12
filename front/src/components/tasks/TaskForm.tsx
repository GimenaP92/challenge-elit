'use client';

import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface TaskFormProps {
  initialTitle: string;
  initialDescription?: string;
  submitText: string;
  onSubmit: (title: string, description?: string) => void;
}

export default function TaskForm({ initialTitle, initialDescription = '', submitText, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <Input label="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Input label="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Button type="submit">{submitText}</Button>
    </form>
  );
}
