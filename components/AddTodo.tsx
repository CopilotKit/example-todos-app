import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTasks } from "@/lib/hooks/use-tasks";

// Helper function to format date to 'YYYY-MM-DDTHH:MM' format
const formatDateTimeLocal = (date: Date) => {
  const pad = (num: number) => num.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export function AddTodo() {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(formatDateTimeLocal(new Date())); // Initialize with current date and time

  const { addTask } = useTasks();

  const handleAddTask = () => {
    addTask(title, new Date(deadline)); // Convert deadline to Date object and pass it to addTask
    setTitle("");
    setDeadline(formatDateTimeLocal(new Date())); // Reset deadline to current date and time
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex items-center mb-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Add a new todo..."
          className="flex-1 mr-2 bg-muted text-muted-foreground rounded-md px-4 py-2"
        />
        <Input
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          type="datetime-local"
          className="flex-1 mr-2 bg-muted text-muted-foreground rounded-md px-4 py-2"
        />
        <Button type="submit" disabled={!title} onClick={handleAddTask}>
          Add
        </Button>
      </div>
    </form>
  );
}