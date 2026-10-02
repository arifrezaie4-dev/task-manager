"use client";

import { useEffect, useRef, useState } from "react";
import TaskList from "./TaskList";
import CreateTask from "./CreateTask";
import { taskService } from "@/services/taskService";

export default function MainContent({ tasksRef }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const formRef = useRef(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");
  
      const response = await taskService.getTasks();
  
      setTasks(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex-grow-1 p-4">
      <div ref={tasksRef}>
        <CreateTask
          onTaskCreated={fetchTasks}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          formRef={formRef}
        />

        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onTaskDeleted={fetchTasks}
          onSelectedTask={setSelectedTask}
        />
      </div>
    </div>
  );
}