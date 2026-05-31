const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const countText = document.querySelector("#count");
const clearCompletedBtn = document.querySelector("#clearCompleted");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

renderTodos();

// ADD TODO
todoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = todoInput.value.trim();

  if (text === "") return;

  todos.push({
    id: Date.now(),
    text: text,
    completed: false,
  });

  saveTodos();
  renderTodos();

  todoInput.value = "";
});

// EVENT DELEGATION
todoList.addEventListener("click", function (e) {
  const li = e.target.closest("li");

  if (!li) return;

  const id = Number(li.dataset.id);

  // DELETE
  if (e.target.classList.contains("delete-btn")) {
    todos = todos.filter((todo) => todo.id !== id);

    saveTodos();
    renderTodos();
  }

  // TOGGLE COMPLETED
  if (e.target.classList.contains("todo-text")) {
    todos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }

      return todo;
    });

    saveTodos();
    renderTodos();
  }
});

// EDIT TODO
todoList.addEventListener("dblclick", function (e) {
  if (!e.target.classList.contains("todo-text")) {
    return;
  }

  const li = e.target.closest("li");
  const id = Number(li.dataset.id);

  const input = document.createElement("input");

  input.value = e.target.textContent;

  e.target.replaceWith(input);

  input.focus();

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const newText = input.value.trim();

      if (newText === "") {
        renderTodos();
        return;
      }

      todos = todos.map((todo) => {
        if (todo.id === id) {
          todo.text = newText;
        }

        return todo;
      });

      saveTodos();
      renderTodos();
    }
  });
});

// FILTER
document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;

    renderTodos();
  });
});

// CLEAR COMPLETED
clearCompletedBtn.addEventListener("click", function () {
  todos = todos.filter((todo) => !todo.completed);

  saveTodos();
  renderTodos();
});

// RENDER TODOS
function renderTodos() {
  todoList.innerHTML = "";

  let filteredTodos = todos;

  if (currentFilter === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (currentFilter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo";
    li.dataset.id = todo.id;

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;

    if (todo.completed) {
      span.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "delete-btn";

    li.appendChild(span);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });

  updateCount();
}

// COUNT
function updateCount() {
  const activeTodos = todos.filter((todo) => !todo.completed);

  countText.textContent = `${activeTodos.length} items left`;
}

// SAVE LOCAL STORAGE
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
