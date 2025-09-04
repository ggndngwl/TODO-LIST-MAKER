const input = document.querySelector('#todo-input');
const submitBtn = document.querySelector('#submit');
const todoList = document.querySelector('.todo-lists');
const importantList = document.querySelector('.important-lists');


// Add Task Function

function addTask() {
  const task = input.value.trim();
  if (task === "") return;

  input.value = "";

  const todo_el = document.createElement('div');
  todo_el.classList.add('todo-item');

  const todo_input_el = document.createElement('input');
  todo_input_el.type = 'text';
  todo_input_el.value = task;
  todo_input_el.setAttribute('readonly', 'readonly');

  const actions = document.createElement('div');
  actions.classList.add('action-items');

  const doneBtn = document.createElement('i');
  doneBtn.classList.add('fa-solid', 'fa-check');

  const editBtn = document.createElement('i');
  editBtn.classList.add('fa-solid', 'fa-pen-to-square', 'edit');

  const deleteBtn = document.createElement('i');
  deleteBtn.classList.add('fa-solid', 'fa-trash');

  const importantBtn = document.createElement('i');
  importantBtn.classList.add('fa-solid', 'fa-star');

  actions.appendChild(doneBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);
  actions.appendChild(importantBtn);

  todo_el.appendChild(todo_input_el);
  todo_el.appendChild(actions);
  todoList.appendChild(todo_el);

  // Done Task
  doneBtn.addEventListener('click', () => {
    todo_input_el.classList.toggle('done');
  });

  // Edit Task
  editBtn.addEventListener('click', () => {
    if (editBtn.classList.contains("edit")) {
      editBtn.classList.remove("edit");
      editBtn.classList.remove("fa-pen-to-square");
      editBtn.classList.add("fa-x");
      todo_input_el.removeAttribute("readonly");
      todo_input_el.focus();
    } else {
      editBtn.classList.add("edit");
      editBtn.classList.remove("fa-x");
      editBtn.classList.add("fa-pen-to-square");
      todo_input_el.setAttribute("readonly", "readonly");
    }
  });

  // Delete Task
  deleteBtn.addEventListener('click', () => {
    todoList.removeChild(todo_el);
  });

  // Mark as Important
  importantBtn.addEventListener('click', () => {
    const impItem = todo_el.cloneNode(true);
    importantList.appendChild(impItem);
    importantBtn.style.color = "#fbbf24";
  });
}

// Add task on button click
submitBtn.addEventListener('click', addTask);

// Add task on Enter key
input.addEventListener('keypress', (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Calendar

const monthYear = document.getElementById("month-year");
const calendarDays = document.getElementById("calendar-days");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

let currentDate = new Date();

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = date.toLocaleString("default", { month: "long", year: "numeric" });

  calendarDays.innerHTML = "";

  // Empty days before start
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    calendarDays.appendChild(empty);
  }

  for (let day = 1; day <= lastDate; day++) {
    const dayEl = document.createElement("div");
    dayEl.textContent = day;

    const today = new Date();
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayEl.classList.add("today");
    }

    calendarDays.appendChild(dayEl);
  }
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

renderCalendar(currentDate);
