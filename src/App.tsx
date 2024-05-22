import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskFormWrapper from "./components/TaskFormWrapper";
import TaskForm from "./components/TaskForm";
import Navbar from "./components/Navbar"; // Import the Navbar component
import { fetchTasks } from "./utils/api";
import Task from "./components/Task";
import styled from "styled-components";

// Styled Navbar component
const StyledNavbar = styled(Navbar)`
  background-color: #333;
  color: #fff;
  padding: 1rem;
`;

// Styled error message
const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
`;

const AppContainer = styled.div`
  padding: 20px;
`;

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const fetchedTasks: Task[] = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        setError("Failed to load tasks. Please try again later.");
      }
    };
    getTasks();
  }, []);

  const handleCreateTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <Router>
      <StyledNavbar /> {/* Styled Navbar component */}
      <AppContainer>
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <TaskList
                  tasks={tasks}
                  onMarkComplete={(taskId) => {
                    setTasks((prevTasks) =>
                      prevTasks.map((task) =>
                        task.id === taskId
                          ? {
                              ...task,
                              status:
                                task.status === "Completed"
                                  ? "InProgress"
                                  : "Completed",
                            }
                          : task
                      )
                    );
                  }}
                  onDelete={(taskId) => {
                    setTasks((prevTasks) =>
                      prevTasks.filter((task) => task.id !== taskId)
                    );
                  }}
                />
              }
            />
            <Route
              path="/update/:taskId"
              element={
                <TaskFormWrapper tasks={tasks} onSubmit={handleUpdateTask} />
              }
            />
            <Route
              path="/new"
              element={<TaskForm onSubmit={handleCreateTask} />}
            />
          </Routes>
        )}
      </AppContainer>
    </Router>
  );
};

export default App;
