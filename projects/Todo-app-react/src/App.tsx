import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaCheck, FaTimes, FaClipboardList, FaTasks, FaRegCalendarCheck } from "react-icons/fa";
import "./App.css";

interface Task {
  id: number;
  text: string;
  isEditing: boolean;
}

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const task: Task = {
      id: Date.now(),
      text: newTask,
      isEditing: false,
    };
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: true } : task
      )
    );
  };

  const handleUpdateTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText, isEditing: false } : task
      )
    );
  };

  const cancelEditTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: false } : task
      )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddTask();
  };

  return (
    <div className="container">
      <h1 className="title">
        <span className="icon-animate"><FaRegCalendarCheck /></span>
        Todo List
        <span className="icon-animate"><FaTasks /></span>
      </h1>
      <div className="input-group">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a new task"
        />
        <button onClick={handleAddTask}><FaPlus /> Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {task.isEditing ? (
              <div className="edit-group">
                <input
                  defaultValue={task.text}
                  autoFocus
                  onBlur={(e) => handleUpdateTask(task.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUpdateTask(task.id, (e.target as HTMLInputElement).value);
                    }
                  }}
                />
                <div className="inline-buttons">
                  <button onClick={() => handleUpdateTask(task.id, task.text)}><FaCheck /></button>
                  <button onClick={() => cancelEditTask(task.id)}><FaTimes /></button>
                </div>
              </div>
            ) : (
              <>
                <span>{task.text}</span>
                <div className="button-group">
                  <button onClick={() => handleEditTask(task.id)}><FaEdit /></button>
                  <button onClick={() => handleDeleteTask(task.id)}><FaTrash /></button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
