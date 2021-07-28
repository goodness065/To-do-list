let formInput = document.querySelector(".input");

let formBtn = document.querySelector(".submit-btn");

let listHolder = document.querySelector(".list-holder");

let filterOption = document.querySelector(".filter-todo");

formBtn.addEventListener("click", createElement);

listHolder.addEventListener("click", deleteCheck);

filterOption.addEventListener("click", filterTodo);

document.addEventListener("DOMContentLoaded", getTodos);

function createElement(e) {
  e.preventDefault();
  let todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");

  let todolist = document.createElement("li");
  let userInput = formInput.value.trim();

  if (!userInput) {
    alert("Enter your task");
    todoDiv.style.display = "none";
  } else {
    todolist.classList.add("todo-list");
    todolist.innerText = formInput.value;
    saveLocalTodo(formInput.value);
    todoDiv.appendChild(todolist);

    let completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.innerHTML = "<i class='fas fa-check'></i>";
    todoDiv.appendChild(completeBtn);

    let trashBtn = document.createElement("button");
    trashBtn.classList.add("trash-btn");
    trashBtn.innerHTML = "<i class='fas fa-trash'></i>";
    todoDiv.appendChild(trashBtn);

    listHolder.appendChild(todoDiv);

    formInput.value = "";
  }
}

function deleteCheck(e) {
  let item = e.target;
  if (item.classList[0] == "complete-btn") {
    let todo = item.parentElement;
    todo.classList.toggle("line-stroke");
  }
  if (item.classList[0] == "trash-btn") {
    let todo = item.parentElement;
    // todo.remove()
    todo.classList.add("fall");
    removeLocalTodo(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
}

function filterTodo(e) {
  todos = listHolder.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "complete":
        if (todo.classList.contains("line-stroke")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("line-stroke")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
    }
  });
}

function saveLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");

    let todolist = document.createElement("li");
    todolist.classList.add("todo-list");
    todolist.innerText = todo;
    todoDiv.appendChild(todolist);

    let completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.innerHTML = "<i class='fas fa-check'></i>";
    todoDiv.appendChild(completeBtn);

    let trashBtn = document.createElement("button");
    trashBtn.classList.add("trash-btn");
    trashBtn.innerHTML = "<i class='fas fa-trash'></i>";
    todoDiv.appendChild(trashBtn);

    listHolder.appendChild(todoDiv);
  });
}

function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
