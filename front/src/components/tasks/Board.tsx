"use client"
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { Task, TaskStatus } from '../types/Itask';
import { getTasksByUserId, createTask, updateTask, deleteTask } from '../services/taskService';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import NewTaskCard from './NewTaskCard';
import TaskCard from './TaskCard';
import EditTaskCard from './EditTaskCard';
import Image from 'next/image';

const statuses: TaskStatus[] = ['Pendiente', 'En curso', 'Terminada'];

export default function Board() {
  const { user } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  const [highlightedStatus, setHighlightedStatus] = useState<TaskStatus | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasksByUserId(user.id);
        setTasks(fetchedTasks);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [user]);

  const handleCreate = async (title: string, description?: string) => {
    if (!user) return;
    const newTask = await createTask(user.id, { title, description, status: 'Pendiente' });
    setTasks([...tasks, newTask]);
  };

  const handleUpdate = async (taskId: string, data: Partial<Task>) => {
    const updatedTask = await updateTask(taskId, data);
    setTasks(tasks.map(t => (t.id === taskId ? updatedTask : t)));
    setEditingTaskId(null);
  };

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const newStatus = destination.droppableId as TaskStatus;
    await handleUpdate(draggableId, { status: newStatus });

    setHighlightedStatus(newStatus);
    setTimeout(() => setHighlightedStatus(null), 250); 
  };

  if (loading) return <p className="text-sm text-white">Loading...</p>;

  return (
    <div className="w-full mx-auto p-4 font-mono">
      <div className="relative flex items-center gap-2 mb-4">
        <div className="relative w-6 h-6 -translate-y-1">
          <Image
            src="/notas.png"
            alt="Task Icon"
            fill
            className="object-contain rounded-sm"
            priority
          />
        </div>
        <h1 className="text-2xl font-bold text-white">ELIT TASKS</h1>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 ">
         {statuses.map(status => (
      <Droppable droppableId={status} key={status}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`p-2 rounded-lg shadow-md min-h-[150px] transition-all duration-200
              ${snapshot.isDraggingOver 
                ? 'bg-[#1a1a1a]/90 border-2 border-orange-500' 
                : 'bg-[#0a0a0a]/80 border-none'}`
            }
          >
        
        <h2
          className={`text-lg font-semibold mb-3 transition-all duration-300 ${
            highlightedStatus === status ? 'text-orange-500 text-xl scale-105' : 'text-white'
          }`}
        >
          {status}
        </h2>

        {status === 'Pendiente' && <NewTaskCard onSubmit={handleCreate} />}

        <div className="space-y-2">
          {tasks
            .filter(task => task.status === status)
            .map((task, index) => (
              <Draggable draggableId={task.id} index={index} key={task.id}>
                {provided => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {editingTaskId === task.id ? (
                      <EditTaskCard
                        task={task}
                        onSave={data => handleUpdate(task.id, data)}
                        onCancel={() => setEditingTaskId(null)}
                      />
                    ) : (
                    <TaskCard
                      task={task}
                      onEdit={() => setEditingTaskId(task.id)}
                      onDelete={() => handleDelete(task.id)}
                      statusOptions={statuses}
                      onChangeStatus={async (newStatus) => {
                      await handleUpdate(task.id, { status: newStatus as TaskStatus });
                      setHighlightedStatus(newStatus as TaskStatus);
                      setTimeout(() => setHighlightedStatus(null), 250);
                      }}
                    />
                    )}
                  </div>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
        </div>
      </div>
    )}
  </Droppable>
))}
        </div>
      </DragDropContext>
    </div>
  );
}
