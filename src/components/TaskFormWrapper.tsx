import React from "react";
import { useParams } from "react-router-dom";
import TaskForm from "./TaskForm";
import Task from "./Task";

interface TaskFormWrapperProps {
  tasks: Task[];
  onSubmit: (task: Task) => void;
}

const TaskFormWrapper: React.FC<TaskFormWrapperProps> = ({
  tasks,
  onSubmit,
}) => {
  const { taskId } = useParams<{ taskId: string }>();
  const task = tasks.find((task) => task.id === parseInt(taskId ?? "", 10));

  return <TaskForm initialTask={task} onSubmit={onSubmit} />;
};

export default TaskFormWrapper;
