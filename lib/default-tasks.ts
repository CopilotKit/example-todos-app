import { Task, TaskStatus } from "./tasks.types";

export const defaultTasks: Task[] = [
  {
    id: 1,
    title: "Complete project proposal",
    status: TaskStatus.done,
    deadline: new Date(), // Add the deadline property here
  },
  {
    id: 2,
    title: "Review design mockups",
    status: TaskStatus.done,
    deadline: new Date(), // Add the deadline property here
  },
  {
    id: 3,
    title: "Prepare presentation slides",
    status: TaskStatus.todo,
    deadline: new Date(), // Add the deadline property here
  },
  {
    id: 4,
    title: "Send meeting notes email",
    status: TaskStatus.todo,
    deadline: new Date(), // Add the deadline property here
  },
  {
    id: 5,
    title: "Review Uli's pull request",
    status: TaskStatus.todo,
    deadline: new Date(), // Add the deadline property here
  },
];