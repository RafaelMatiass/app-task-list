// components/TaskList/index.tsx
import React from 'react';
import { ScrollView } from 'react-native';

import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: {
    id: number;
    name: string;
    complete: boolean;
    date?: string;
    priority: 'low' | 'medium' | 'high';
  }[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDelete }) => {
  return (
    <ScrollView className="my-8 w-full">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </ScrollView>
  );
};
