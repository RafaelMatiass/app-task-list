// components/TaskInput/index.tsx
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';

interface TaskInputProps {
  onAddTask: (task: string, priority: 'low' | 'medium' | 'high') => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [item, setItem] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');

  const handleAddTask = () => {
    if (item.trim()) {
      onAddTask(item, priority);
      setItem('');
      setPriority('low');
    }
  };

  return (
    <View className="w-full">
      <TextInput
        className="mb-5 h-11 w-full rounded-xl border border-gray-300 px-5"
        placeholder="Adicione uma nova tarefa"
        onChangeText={setItem}
        value={item}
      />
      <View className="mb-5 w-full flex-row justify-between">
        {['low', 'medium', 'high'].map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => setPriority(level as 'low' | 'medium' | 'high')}
            className={`rounded-lg px-4 py-2 ${priority === level ? getPriorityColor(level) : 'bg-gray-300'}`}>
            <Text className="font-bold capitalize text-white">{level}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={handleAddTask}
        className="mb-5 h-11 w-full items-center justify-center rounded-xl bg-cyan-600">
        <Text className="text-lg font-bold text-white">Salvar tarefa</Text>
      </TouchableOpacity>
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
