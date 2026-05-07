function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => {
    const newText = prompt("Edit task:", span.textContent);
    span.textContent = newText.trim();
    
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => li.remove();

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);
  input.value = "";
}


// function addTask() {
//   const input = document.getElementById("taskInput");
//   const taskText = input.value.trim();
//   if (!taskText) return;

//   const li = document.createElement("li");
//   const span = document.createElement("span");
//   span.textContent = taskText;

//   const editBtn = document.createElement("button");
//   editBtn.textContent = "Edit";
//   editBtn.onclick = () => {
//     const newText = prompt("Edit task:", span.textContent);
//     if (newText !== null) span.textContent = newText.trim();
//   };

//   const deleteBtn = document.createElement("button");
//   deleteBtn.textContent = "Delete";
//   deleteBtn.onclick = () => li.remove();

//   li.appendChild(span);
//   li.appendChild(editBtn);
//   li.appendChild(deleteBtn);

//   document.getElementById("taskList").appendChild(li);
//   input.value = "";
// }
