import { useToast } from "@/components/ui/use-toast";
import { createContext, useContext, useState, ReactNode } from "react";

export type Task = {
  id: number;
  title: string;
  status: TaskStatus;
};

export enum TaskStatus {
  todo = "todo",
  done = "done",
}

const defaultTasks: Task[] = [
  {
    id: 1,
    title: "Complete project proposal",
    status: TaskStatus.todo,
  },
  {
    id: 2,
    title: "Review design mockups",
    status: TaskStatus.todo,
  },
  {
    id: 3,
    title: "Prepare presentation slides",
    status: TaskStatus.todo,
  },
];

let nextId = defaultTasks.length + 1;

type TasksContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  setTaskStatus: (id: number, status: TaskStatus) => void;
  deleteTask: (id: number) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const { toast } = useToast();

  const addTask = (title: string) => {
    setTasks([...tasks, { id: nextId++, title, status: TaskStatus.todo }]);
    toast({
      title: `TASK-${nextId}`,
      description: `Task created successfully`,
      duration: 2000
    });
  };

  const setTaskStatus = (id: number, status: TaskStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
    toast({
      title: `TASK-${id}`,
      description: `Status changed to ${status}`,
      duration: 2000
    })
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast({
      title: `TASK-${id}`,
      description: `Task deleted successfully`,
      duration: 2000
    })
  };
  
  return (
    <TasksContext.Provider value={{ tasks, addTask, setTaskStatus, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
