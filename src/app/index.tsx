import '../../global.css';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface TasksProps {
  id: number;
  name: string;
  complete: boolean;
}

export default function Index() {
  const [tasks, setTasks] = useState<TasksProps[]>([]);
  const [item, setItem] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  async function saveTasks() {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Erro ao salvar as tarefas:', error);
    }
  }

  async function loadTasks() {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Erro ao carregar as tarefas:', error);
    }
  }

  function saveItem() {
    if (item.trim()) {
      setTasks([...tasks, { id: tasks.length + 1, name: item, complete: false }]);
      setItem('');
    }
  }

  function toggleComplete(id: number) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, complete: !task.complete } : task))
    );
  }

  function deleteTask(id: number) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasks();
  }

  return (
    <View className="flex-1 items-center bg-gray-100 px-8 pt-16">
      <Text className="mb-12 text-2xl font-bold text-gray-900">Organize Suas Tarefas</Text>

      <TextInput
        className="mb-5 h-11 w-full rounded-xl border border-gray-300 px-5"
        placeholder="Adicione uma nova tarefa"
        onChangeText={setItem}
        value={item}
      />
      <TouchableOpacity
        onPress={saveItem}
        className="mb-5 h-11 w-full items-center justify-center rounded-xl bg-cyan-600">
        <Text className="text-lg font-bold text-white">Adicionar tarefa</Text>
      </TouchableOpacity>

      <View className="mt-8 w-full">
        {tasks.map((item) => (
          <View
            key={item.id}
            className={`mb-4 h-14 w-full flex-row items-center justify-between rounded-xl px-5 shadow-md ${item.complete ? 'bg-teal-500' : 'bg-white'}`}>
            <View className="flex-row items-center space-x-2">
              <Pressable onPress={() => toggleComplete(item.id)}>
                {item.complete ? (
                  <MaterialIcons name="check-box" size={20} color="black" />
                ) : (
                  <MaterialIcons name="check-box-outline-blank" size={20} color="slate-200" />
                )}
              </Pressable>

              <Text className="text-lg text-slate-700">{item.name}</Text>
            </View>
            <Pressable onPress={() => deleteTask(item.id)}>
              <AntDesign name="delete" size={24} color={item.complete ? 'black' : 'slate-200'} />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}
