import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Task from "./Task";

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialTask, onSubmit }) => {
  const [formData, setFormData] = useState<Task>({
    id: initialTask?.id || Date.now(),
    name: initialTask?.name || "",
    dueDate: initialTask ? new Date(initialTask.dueDate) : new Date(),
    description: initialTask?.description || "",
    status: initialTask?.status || "InProgress",
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "dueDate" ? new Date(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="name">Task Name:</Label>
      <Input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <Label htmlFor="dueDate">Due Date:</Label>
      <Input
        type="date"
        id="dueDate"
        name="dueDate"
        value={formData.dueDate.toISOString().split("T")[0]}
        onChange={handleChange}
        required
      />

      <Label htmlFor="description">Description (Optional):</Label>
      <Textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <Label htmlFor="status">Status:</Label>
      <Select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="InProgress">In Progress</option>
        <option value="Completed">Completed</option>
      </Select>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default TaskForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  margin-bottom: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.25);
  }
`;

const Textarea = styled.textarea`
  margin-bottom: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  height: 100px;
  resize: none;
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.25);
  }
`;

const Select = styled.select`
  margin-bottom: 16px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.25);
  }
`;
