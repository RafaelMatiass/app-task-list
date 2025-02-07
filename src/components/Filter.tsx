import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

interface FilterControlsProps {
  filter: 'todas' | 'pendente' | 'concluida';
  sortOrder: 'asc' | 'desc';
  onSetFilter: (filter: 'todas' | 'pendente' | 'concluida') => void;
  onSetSortOrder: (sortOrder: 'asc' | 'desc') => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  filter,
  sortOrder,
  onSetFilter,
  onSetSortOrder,
}) => {
  return (
    <View className="mt-8 w-full flex-row justify-around">
      <MaterialIcons name="filter-alt" size={24} color="black" />
      {['todas', 'pendente', 'concluida'].map((f) => (
        <TouchableOpacity
          key={f}
          onPress={() => onSetFilter(f as any)}
          className="rounded-lg bg-gray-300 px-4 py-2">
          <Text className="text-gray-700">{f}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={() => onSetSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        className="rounded-lg bg-gray-300 px-4 py-2">
        <Text className="text-gray-700">{sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</Text>
      </TouchableOpacity>
    </View>
  );
};
