// Define global variables
const input = document.querySelector("input");
const addButton = document.querySelector(".todo-app__btn");
const todosHtml = document.querySelector(".todos");
const emptyImage = document.querySelector(".empty-image");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let filter = "";

// Call showTodos method
showTodos();

// Define getTodoHtml method - Create a template for a to-do list
function getTodoHtml(todo, index) {
  if (filter && filter != todo.status) {
    return "";
  }
  let checked = todo.status == "completed" ? "checked" : "";
  return /* template html */ `
    <li class="todo">
      <label for="${index}">
        <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
        <span class="${checked}">${todo.name}</span>
      </label>
      <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
    </li>
  `;
}

// Define showTodos method - Display todo list on user interface
function showTodos() {
  if (todosJson.length == 0) {
    todosHtml.innerHTML = "";
    emptyImage.style.display = "block";
  } else {
    todosHtml.innerHTML = todosJson.map(getTodoHtml).join("");
    emptyImage.style.display = "none";
  }
}
// Define addTodo method - Add a task (todo) to the task list and store it in the browser's localStorage
function addTodo(todo) {
  input.value = "";
  todosJson.unshift({ name: todo, status: "pending" });
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
}

// Event : Keyboard input event for input box
input.addEventListener("keyup", (e) => {
  let todo = input.value.trim();
  if (!todo || e.key != "Enter") {
    return;
  }
  addTodo(todo);
});

// Event : Add tasks to to-do list
addButton.addEventListener("click", () => {
  let todo = input.value.trim();
  if (!todo) {
    return;
  }
  addTodo(todo);
});

// Define updateStatus method - Update the status of a task in the (todo) list
function updateStatus(todo) {
  let todoName = todo.parentElement.lastElementChild;
  if (todo.checked) {
    todoName.classList.add("checked");
    todosJson[todo.id].status = "completed";
  } else {
    todoName.classList.remove("checked");
    todosJson[todo.id].status = "pending";
  }
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

//  Define remove method - Remove a todo from the list and update the UI
function remove(todo) {
  const index = todo.dataset.index;
  todosJson.splice(index, 1);
  showTodos();
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

// Loop through each element in the array - Handle events when the user clicks on elements in the filter list
filters.forEach(function (el) {
  el.addEventListener("click", (e) => {
    if (el.classList.contains("active")) {
      el.classList.remove("active");
      filter = "";
    } else {
      filters.forEach((tag) => tag.classList.remove("active"));
      el.classList.add("active");
      filter = e.target.dataset.filter;
    }
    showTodos();
  });
});

// Event : Delete all tasks in the to-do list
deleteAllButton.addEventListener("click", () => {
  todosJson = [];
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
});
