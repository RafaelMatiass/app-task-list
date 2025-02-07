// hooks/useTasks.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

export const useTasks = () => {
  const [tasks, setTasks] = useState<
    {
      id: number;
      name: string;
      complete: boolean;
      date?: string;
      priority: 'low' | 'medium' | 'high';
    }[]
  >([]);
  const [filter, setFilter] = useState<'todas' | 'pendente' | 'concluida'>('todas');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchInitialTasks();
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  async function fetchInitialTasks() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3');
      const data = await response.json();
      const formattedTasks = data.map((task: any) => ({
        id: task.id,
        name: task.title,
        complete: false,
        date: format(new Date(), 'MMM d'),
        priority: 'low',
      }));
      setTasks(formattedTasks);
    } catch (error) {
      console.error('Erro ao buscar tarefas da API:', error);
    }
  }

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

  function addTask(name: string, priority: 'low' | 'medium' | 'high') {
    const newTask = {
      id: tasks.length + 1,
      name,
      complete: false,
      date: format(new Date(), 'MMM d'),
      priority,
    };
    setTasks([...tasks, newTask]);
  }

  function toggleComplete(id: number) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, complete: !task.complete } : task))
    );
  }

  function deleteTask(id: number) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function filteredTasks() {
    return tasks
      .filter((task) =>
        filter === 'pendente' ? !task.complete : filter === 'concluida' ? task.complete : true
      )
      .sort((a, b) =>
        sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
  }

  return {
    tasks: filteredTasks(),
    filter,
    sortOrder,
    setFilter,
    setSortOrder,
    addTask,
    toggleComplete,
    deleteTask,
  };
};
