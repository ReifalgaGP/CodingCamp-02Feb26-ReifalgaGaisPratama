// ===== STATE =====
let todoList = [];
let filterTodo = "all"; // all | today | upcoming

// ===== ADD TODO =====
function addTodo() {
  const inputTodo = document.getElementById("toDoInput");
  const inputDate = document.getElementById("toDoDate");

  const todoText = inputTodo.value.trim();
  const todoDate = inputDate.value;

  if (todoText === "" || todoDate === "") {
    alert("Please enter both a todo item and a due date.");
    return;
  }

  todoList.push({
    todo: todoText,
    date: todoDate,
  });

  inputTodo.value = "";
  inputDate.value = "";

  applyFilter();
}

// ===== DELETE ALL =====
function deleteAllTodos() {
  if (!confirm("Delete all todos?")) return;
  todoList = [];
  applyFilter();
}

// ===== TOGGLE FILTER (ONE BUTTON) =====
function filterTodos() {
  const filterBtn = document.getElementById("filterSelect");

  if (filterTodo === "all") {
    filterTodo = "today";
    filterBtn.textContent = "Filter: Today";
    filterBtn.className =
      "bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600";
  } else if (filterTodo === "today") {
    filterTodo = "upcoming";
    filterBtn.textContent = "Filter: Upcoming";
    filterBtn.className =
      "bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600";
  } else {
    filterTodo = "all";
    filterBtn.textContent = "Filter: All";
    filterBtn.className =
      "bg-gray-500 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-600";
  }

  applyFilter();
}

// ===== APPLY FILTER =====
function applyFilter() {
  const today = new Date().toISOString().split("T")[0];
  let filteredTodos = [...todoList];

  if (filterTodo === "today") {
    filteredTodos = todoList.filter((item) => item.date === today);
  } else if (filterTodo === "upcoming") {
    filteredTodos = todoList.filter((item) => item.date > today);
  }

  renderTodos(filteredTodos);
}

// ===== RENDER TODOS =====
function renderTodos(data) {
  const todoListElement = document.getElementById("to-do-list");
  todoListElement.innerHTML = "";

  if (data.length === 0) {
    todoListElement.innerHTML =
      "<li class='text-gray-500'>No todos available</li>";
    return;
  }

  data.forEach((item) => {
    todoListElement.innerHTML += `
      <li class="mb-3">
        <p class="text-lg font-medium">
          ${item.todo}
          <span class="text-sm text-gray-500">
            (${item.date})
          </span>
        </p>
        <hr />
      </li>
    `;
  });
}
