let tasks = [];
const taskInput = document.getElementById("taskInput");
const newTask = document.getElementById("newTask");
const taskList = document.getElementById("task-list");

// Button : Add Task
newTask.addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});
// Display List Item Task
const updateTaskList = () => {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
        <div class="task-item">
          <div class="task ${task.completed ? "completed" : ""}">
            <input type="checkbox" class="checkbox" ${
              task.completed ? "checked" : ""
            }/>
            <p>${task.task}</p>
          </div>
          <div class="icons">
            <!-- edit -->
            <i class="task-action task-action--edit fa-solid fa-pen-to-square" onClick="editTask(${index})"></i>
            <!-- remove -->
            <i class="task-action task-action--delete fa-solid fa-trash-can" onClick="deleteTask(${index})"></i>
          </div>
        </div>
      `;
    taskList.appendChild(listItem);
    listItem.addEventListener("change", () => toggleTaskCompleted(index));
  });
};
// Add Task
const addTask = () => {
  const name = taskInput.value.trim();
  if (name) {
    tasks.push({ task: name, completed: false });
    taskInput.value = "";
    updateTaskList();
    updateStatus();
    saveTaskLocalStorage();
  }
};
// Edit Task
const editTask = (index) => {
  taskInput.value = tasks[index].task;
  tasks.splice(index, 1);
  updateTaskList();

  saveTaskLocalStorage();
};
// Delete Task
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  updateStatus();

  saveTaskLocalStorage();
};
// Check Task Completed
const toggleTaskCompleted = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updateStatus();

  saveTaskLocalStorage();
};
// Update Status Tasks
const updateStatus = () => {
  const completeTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = (completeTasks / totalTasks) * 100;
  const progressBar = document.getElementById("progress");

  progressBar.style.width = `${progress}%`;

  numbers = document.getElementById("numbers");
  numbers.innerHTML = `${completeTasks} / ${totalTasks}`;

  if (tasks.length && completeTasks == totalTasks) {
    SchoolPrideConfetti();
  }
};
// Save Task on LocalStorage
const saveTaskLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
// Save Task when reload browser
document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    storedTasks.forEach((task) => tasks.push(task));
    updateTaskList();
    updateStatus();
  }
});

/* Confetti JS - Animation beautiful effect
  https://confetti.js.org/more.html
*/
const SchoolPrideConfetti = () => {
  const end = Date.now() + 15 * 1000;

  // go Buckeyes!
  const colors = ["#bb0000", "#ffffff"];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });

    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
