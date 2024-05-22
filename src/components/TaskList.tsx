import React, { useState } from "react";
import styled from "styled-components";
import TaskItem from "./TaskItem";
import Task from "./Task";

interface TaskListProps {
  tasks: Task[];
  onMarkComplete: (taskId: number) => void;
  onDelete: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onMarkComplete,
  onDelete,
}) => {
  const [searchText, setSearchText] = useState("");
  const [sortField, setSortField] = useState<"name" | "dueDate">("name");
  const [deletedTaskId, setDeletedTaskId] = useState<number | null>(null);

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedTasks = filteredTasks.slice().sort((a, b) => {
    if (sortField === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
  });

  const handleDeleteTask = (taskId: number) => {
    onDelete(taskId);
    setDeletedTaskId(taskId);
    setTimeout(() => {
      setDeletedTaskId(null);
    }, 2000); // 2 seconds delay before clearing the deletedTaskId
  };

  return (
    <TaskListContainer>
      <SearchInputContainer>
        <SearchInputLabel htmlFor="search">Search tasks:</SearchInputLabel>
        <SearchInput
          id="search"
          type="text"
          placeholder="Search tasks"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </SearchInputContainer>
      <Subtitle>Task Lists</Subtitle>
      <ListContainer>
        <Heading>Task List</Heading>
        <SortSelectContainer>
          <SortSelect
            value={sortField}
            onChange={(e) => setSortField(e.target.value as "name" | "dueDate")}
          >
            <option value="name">Sort by Name</option>
            <option value="dueDate">Sort by Due Date</option>
          </SortSelect>
        </SortSelectContainer>
        {deletedTaskId && <DeletedMessage>Task deleted</DeletedMessage>}
        {sortedTasks.length === 0 ? (
          <NoTasksMessage>No tasks found!</NoTasksMessage>
        ) : (
          <TaskItemsContainer>
            {sortedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onMarkComplete={() => onMarkComplete(task.id)}
                onDelete={() => handleDeleteTask(task.id)}
              />
            ))}
          </TaskItemsContainer>
        )}
      </ListContainer>
    </TaskListContainer>
  );
};

export default TaskList;

// Styled components
const TaskListContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Subtitle = styled.h3`
  margin-bottom: 10px;
  color: #666;
  border-bottom: 2px solid #ccc; /* Added border */
  padding-bottom: 5px; /* Added padding */
`;

const SearchInputContainer = styled.div`
  margin-bottom: 16px;
`;

const SearchInputLabel = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

const SearchInput = styled.input`
  width: calc(100% - 22px); /* Adjusted width to maintain uniformity */
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

const SortSelectContainer = styled.div`
  margin-bottom: 16px;
`;

const SortSelect = styled.select`
  width: 100%;
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

const NoTasksMessage = styled.p`
  color: #999;
  text-align: center;
`;

const TaskItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DeletedMessage = styled.div`
  background-color: #ffc107;
  color: #333;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
`;

const ListContainer = styled.div`
  border: 1px solid #ccc; /* Added border */
  padding: 20px; /* Added padding */
  border-radius: 8px; /* Added border radius */
  margin-top: 20px; /* Added margin */
`;
