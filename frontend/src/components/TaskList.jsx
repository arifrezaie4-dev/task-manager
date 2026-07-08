const TaskList = ({ tasks, loading, error }) => {
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
          </div>
        </div>
      ))}
    </>
  );
};

export default TaskList;
