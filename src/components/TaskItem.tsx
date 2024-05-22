import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Task from "./Task";

interface TaskItemProps {
  task: Task;
  onMarkComplete: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onMarkComplete,
  onDelete,
}) => (
  <TaskItemContainer>
    <TaskName completed={task.status === "Completed"}>{task.name}</TaskName>
    <Actions>
      <ActionButton onClick={onMarkComplete}>
        {task.status === "Completed" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </ActionButton>
      <ActionButton onClick={onDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </ActionButton>
      <StyledLink to={`/update/${task.id}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 3h6v6M10 14L21 3"
          />
        </svg>
      </StyledLink>
    </Actions>
  </TaskItemContainer>
);

export default TaskItem;

interface TaskNameProps {
  completed: boolean;
}

const TaskItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TaskName = styled.p<TaskNameProps>`
  margin: 0;
  color: ${(props) => (props.completed ? "#999" : "#333")};
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.2rem;
  margin: 0 5px;
  &:hover {
    color: #007bff;
  }
`;

const StyledLink = styled(Link)`
  font-size: 1.2rem;
  text-decoration: none;
  color: inherit;
  &:hover {
    color: #007bff;
  }
`;
