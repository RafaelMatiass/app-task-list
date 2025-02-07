// components/PrioritySelector/index.tsx
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

interface PrioritySelectorProps {
  selectedPriority: 'low' | 'medium' | 'high';
  onSelectPriority: (priority: 'low' | 'medium' | 'high') => void;
}

export const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  selectedPriority,
  onSelectPriority,
}) => {
  return (
    <View className="mb-5 w-full flex-row justify-between">
      {['low', 'medium', 'high'].map((level) => (
        <TouchableOpacity
          key={level}
          onPress={() => onSelectPriority(level as 'low' | 'medium' | 'high')}
          className={`rounded-lg px-4 py-2 ${selectedPriority === level ? getPriorityColor(level) : 'bg-gray-300'}`}>
          <Text className="font-bold capitalize text-white">{level}</Text>
        </TouchableOpacity>
      ))}
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
