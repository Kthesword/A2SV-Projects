// todo.ts

interface Task {
  id: number;
  text: string;
}

let tasks: Task[] = [];
let nextId = 1;

// DOM elements
const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

// Add Task
function addTask(): void {
  const text = taskInput.value.trim();
  if (text === "") return;

  const newTask: Task = { id: nextId++, text };
  tasks.push(newTask);
  taskInput.value = "";
  renderTasks();
}

// Edit Task
function editTask(id: number): void {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const newText = prompt("Edit task:", task.text);
  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    renderTasks();
  }
}

// Delete Task
function deleteTask(id: number): void {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Render Tasks to UI
function renderTasks(): void {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => editTask(task.id);

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.onclick = () => deleteTask(task.id);

    li.append(" ", editBtn, delBtn);
    taskList.appendChild(li);
  });
}

// Event Listener
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
