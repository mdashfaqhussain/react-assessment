interface Task {
  id: number;
  name: string;
  dueDate: Date;
  description?: string;
  status: "InProgress" | "Completed";
}

export default Task;
