export type Task = {
  id: number;
  title: string;
  status: TaskStatus;
  deadline: Date; // New property added here
};

export enum TaskStatus {
  todo = "todo",
  done = "done",
}
