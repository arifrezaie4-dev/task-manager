"use client";

import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { taskService } from "@/services/taskService";
import { useState } from "react";

type Task = {
  id: number;
  title: string;
  description?: string;
  isDone: boolean;
};

type TaskListProps = {
  tasks: Task[];
  loading: boolean;
  error: string;
  onTaskDeleted: () => Promise<void>;
  onSelectedTask: (task: Task) => void;
};

export default function TaskList({
  tasks,
  loading,
  error,
  onTaskDeleted,
  onSelectedTask,
}: TaskListProps) {
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const tasksPerPage = 3;

  const filteredTasks =
    filter === "completed"
      ? tasks.filter((task) => task.isDone)
      : filter === "pending"
        ? tasks.filter((task) => !task.isDone)
        : tasks;

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const startIndex = (currentPage - 1) * tasksPerPage;

  const paginatedTasks = filteredTasks.slice(
    startIndex,
    startIndex + tasksPerPage
  );

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await taskService.deleteTask(id);
      await onTaskDeleted();

      Swal.fire({
        title: "Deleted!",
        text: "Task deleted successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete task.",
        icon: "error",
      });

      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (tasks.length === 0) {
    return <h4>No tasks yet. Create your first task.</h4>;
  }

  return (
    <>
      <h3>My Tasks</h3>

      <p className="text-muted">
        Total Tasks: {tasks.length}
      </p>

      <div className="mb-3">
        <label className="form-label">Filter Tasks</label>

        <select
          className="form-select"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="border-line"></div>

      {paginatedTasks.map((task) => (
        <div
          className="card shadow-sm mb-3 card-hov"
          key={task.id}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{task.title}</h5>

              <span
                className={
                  task.isDone
                    ? "badge bg-success rounded-pill me-2"
                    : "badge bg-warning rounded-pill me-2"
                }
              >
                {task.isDone ? "Completed" : "Pending"}
              </span>
            </div>

            <p className="text-muted">
              {task.description}
            </p>

            <div className="mt-3 d-flex gap-2">
              <button
                className="btn btn-warning btn-sm"
                onClick={() => onSelectedTask(task)}
              >
                <FaEdit className="me-1" />
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(task.id)}
              >
                <FaTrash className="me-1" />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="d-flex justify-content-center gap-2 mt-4">
          <button
            className="btn btn-outline-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span className="align-self-center">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-outline-primary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}