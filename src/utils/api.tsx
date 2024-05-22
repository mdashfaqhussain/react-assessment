import Task from "../components/Task";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch("https://todo-manager.free.beeceptor.com/todos");
  const data = await response.json();
  return data as Task[];
};
