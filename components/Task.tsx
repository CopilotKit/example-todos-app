import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTasks } from "@/lib/hooks/use-tasks";
import { motion } from "framer-motion";
import { TaskStatus, type Task } from "@/lib/tasks.types";
import { useState, useEffect } from "react";


export function Task({ task: { id, title, status, deadline } }: { task: Task }) {
  const { setTaskStatus, deleteTask } = useTasks();
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date();
      const timeDiff = new Date(deadline).getTime() - now.getTime();
      if (timeDiff <= 0) {
        setRemainingTime("Deadline passed");
        return;
      }
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
    };

    calculateRemainingTime();
    const interval = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <motion.div
      key={`${id}_${status}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-4 p-2 rounded-md bg-muted"
    >
      <Checkbox
        id={`task_${id}`}
        onClick={() => setTaskStatus(id, status === TaskStatus.done ? TaskStatus.todo : TaskStatus.done)}
        checked={status === TaskStatus.done}
      />
      <div className="text-sm text-neutral-500 font-medium">TASK-{id}</div>
      <Label
        htmlFor={`task_${id}`}
        className={cn(
          "flex-1 text-sm text-muted-foreground",
          status === TaskStatus.done && "line-through"
        )}
      >
        {title}
      </Label>
      <div className="text-sm text-neutral-500">{remainingTime}</div>
      <Button variant="ghost" size="sm" onClick={() => deleteTask(id)}>
        <TrashIcon className="w-4 h-4" />
        <span className="sr-only">Delete</span>
      </Button>
    </motion.div>
  );
}
