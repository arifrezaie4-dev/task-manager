// import { useEffect, useState } from "react";
// import { taskService } from "../services/taskService";

// const MainContent = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await taskService.getTasks();
//         console.log(response);
//         setTasks(response.data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);
//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <div className="spinner-border"></div>
//       </div>
//     );
//   }
//   if (tasks.length === 0) {
//     return <h3>No tasks yet. Create your first task</h3>;
//   }
//   return (
//     <div className="flex-grow-1 p-4">
//       <h2>Dashboard</h2>

//       <h3>My Tasks</h3>

//       <p className="text-muted">Total Tasks: {tasks.length}</p>

//       {tasks.map((task) => (
//         <div className="card shadow-sm mb-3" key={task.id}>
//           <div className="card-body">
//             <div className="d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">{task.title}</h5>

//               <p className="text-muted">{task.description}</p>
//               <span
//                 className={
//                   task.isDone ? "badge bg-success" : "badge bg-warning"
//                 }
//               >
//                 {task.isDone ? "Completed" : "Pending"}
//               </span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MainContent;
import { useEffect, useRef, useState } from "react";
import TaskList from "./TaskList";
import { CreateTask } from "./tasks/CreateTaskForm";
import { taskService } from "../services/taskService";

const MainContent = ({ tasksRef }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const formRef = useRef(null)
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks();
      console.log(response);
      setTasks(response.data);
    } catch (error) {
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
          formRef = {formRef}
        />

        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onTaskDeleted={fetchTasks}
          onSelectedTask={setSelectedTask}
          formRef={formRef}
        />
      </div>
    </div>
  );
};

export default MainContent;
