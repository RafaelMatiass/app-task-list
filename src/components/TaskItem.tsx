// components/TaskItem/index.tsx
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface TaskItemProps {
  task: {
    id: number;
    name: string;
    complete: boolean;
    date?: string;
    priority: 'low' | 'medium' | 'high';
  };
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  return (
    <View
      className={`mb-4 w-full flex-row items-center justify-between rounded-xl px-4 py-2 ${task.complete ? 'bg-green-300' : 'bg-white'}`}>
      <View className="flex-1 flex-row items-center space-x-2">
        <View className={`mr-2 h-3 w-3 rounded-full ${getPriorityColor(task.priority)}`} />
        <Pressable onPress={() => onToggleComplete(task.id)}>
          {task.complete ? (
            <MaterialIcons name="check-box" size={20} color="black" />
          ) : (
            <MaterialIcons name="check-box-outline-blank" size={20} color="black" />
          )}
        </Pressable>
        <Text className="flex-1 flex-wrap px-2 text-lg text-slate-700">{task.name}</Text>
      </View>
      <View className="flex-row items-center space-x-3">
        <Text className="text-sm text-gray-500">{task.date}</Text>
        <Pressable onPress={() => onDelete(task.id)}>
          <MaterialIcons name="delete-outline" size={24} color={task.complete ? 'black' : 'red'} />
        </Pressable>
      </View>
    </View>
  );
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-yellow-500';
    default:
      return 'bg-green-500';
  }
};
