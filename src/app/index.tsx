import React from 'react';
import { View, Text } from 'react-native';
import '../../global.css';

import { FilterControls } from '../components/Filter';
import { TaskInput } from '../components/TaskInput';
import { TaskList } from '../components/TaskList';
import { useTasks } from '../hooks/useTasks';

export default function App() {
  const { tasks, filter, sortOrder, setFilter, setSortOrder, addTask, toggleComplete, deleteTask } =
    useTasks();

  return (
    <View className="flex-1 items-center bg-gray-100 px-8 pt-16">
      <Text className="mb-12 text-2xl font-bold text-gray-900">ORGANIZE SUAS TAREFAS</Text>
      <View className="w-full items-center rounded-2xl border border-gray-300 p-2">
        <Text className="mb-12 text-2xl font-bold text-cyan-600">Adicionar Tarefas</Text>

        <TaskInput onAddTask={addTask} />
      </View>

      <Text className="mt-12 text-2xl font-bold text-cyan-600">Lista de Tarefas</Text>
      <FilterControls
        filter={filter}
        sortOrder={sortOrder}
        onSetFilter={setFilter}
        onSetSortOrder={setSortOrder}
      />

      <TaskList tasks={tasks} onToggleComplete={toggleComplete} onDelete={deleteTask} />
    </View>
  );
}
