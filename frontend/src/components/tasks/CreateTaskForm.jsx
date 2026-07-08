import { useState } from "react";
import { taskService } from "../../services/taskService";
import Swal from "sweetalert2";
export const CreateTask = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await taskService.createTask({
        title,
        description,
      });
      await onTaskCreated();
      setTitle("")
      setDescription("")
      Swal.fire({
        title: "Task created successfully!",
        text: "Your task has been added.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    
    } catch (error) {
        Swal.fire({
            title: "Oops",
            text: "failed to Create task!",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
        })
        console.error(error)
    } finally {
        setLoading(false)
    }
  };
  return (
    <>
      <h3>Create Task</h3>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>

              <textarea
                className="form-control"
                rows="4"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm me-2"></span>
              )}

              {loading ? "Creating..." : "Create Task"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
