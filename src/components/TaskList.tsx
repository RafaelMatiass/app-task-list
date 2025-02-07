import '../../global.css';

interface ListProps {
  tasks: { id: number; name: string; complete: boolean }[];
  onToggleComplete: (id: number) => void;
}

export default function TaskList({ tasks, onToggleComplete }: ListProps) {}
