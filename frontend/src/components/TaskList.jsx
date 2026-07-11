import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { taskService } from "../services/taskService";
const TaskList = ({ tasks, loading, error, onTaskDeleted, onSelectedTask }) => {
  const handleDelete = async (id) => {
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
      await onTaskDeleted()
      Swal.fire({
        title: "Deleted!",
        text: "Task deleted successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete task.",
        icon: "error",
      }); 
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
    return <h3>No tasks yet. Create your first task</h3>;
  }

  return (
    <>
      <h3>My Tasks</h3>

      <p className="text-muted">Total Tasks: {tasks.length}</p>

      {tasks.map((task) => (
        <div className="card shadow-sm mb-3" key={task.id}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{task.title}</h5>
              <span
                className={
                  task.isDone ? "badge bg-success" : "badge bg-warning"
                }
              >
                {task.isDone ? "Completed" : "Pending"}
              </span>
            </div>
            <p className="text-muted">{task.description}</p>
            <div className="mt-3 d-flex gap-2">
              <button className="btn btn-warning btn-sm" onClick={() => onSelectedTask(task)}>
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
    </>
  );
};

export default TaskList;
