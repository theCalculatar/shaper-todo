import { delTodo, editTodo, getTodos, postTodo } from "./networkCall.js";

let todos = [];

const addBtn = document.getElementById("addTask");

const display = async () => {
  let tasks = document.getElementsByClassName("task-list");

  todos = await getTodos();

  tasks[0].innerHTML = todos
    ?.map((todo) => {
      return `<li>
                    <div class="priority-color" style="background-color:${priority(
                      todo
                    )}"></div>
                    <div class="content">
                        <span contenteditable="true" class="editable-title" id="span-${
                          todo.id
                        }">${todo.task}</span>
                        <span contenteditable="true" class="editable-description" id="spand-${
                          todo.id
                        }">${todo.description}</span>
                    </div>
                    <div class="butttons">
                        <button id="${
                          todo.id
                        }" class="del-btn"><i class="bi bi-trash-fill"></i></button>
                        <p id="complete-${todo.id}" class="complete-btn">${
        todo.status
      }</p>
                    </div>
                </li>
            `;
    })
    .join("");

  const deleteBtn = document.querySelectorAll(".del-btn");
  const title = document.querySelectorAll(".editable-title");
  const description_ = document.querySelectorAll(".editable-description");
  const complete = document.querySelectorAll(".complete-btn");

  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", async () => {
      await delTodo(btn.id);
      display();
    });
  });

  title.forEach((span) => {
    var timer; // we doing the react this in js baby!
    span.addEventListener("keydown", async () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const todoID = span.id.split("-")[1];
        const todo = todos.filter((todo) => {
          return todo.id == todoID;
        })[0];
        editTodo({ ...todo, task: span.innerHTML });
      }, 2000);
    });
  });

  description_.forEach((spand) => {
    var timer; // we doing the react this in js baby!
    spand.addEventListener("keydown", async () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        const todoID = spand.id.split("-")[1];
        const todo = todos.filter((todo) => {
          return todo.id == todoID;
        })[0];
        await editTodo({ ...todo, description: spand.innerHTML });
      }, 2000);
    });
  });

  complete.forEach((statusBtn) => {
    statusBtn.addEventListener("click", async () => {
      const todoID = statusBtn.id.split("-")[1];
      const todo = todos.filter((todo) => {
        return todo.id == todoID;
      })[0];
      todos[todos.indexOf(todo)] = {
        ...todo,
        status: toggleStatus(todo.status),
      };
      await editTodo({ ...todo, status: toggleStatus(todo.status) });
      statusBtn.innerHTML = toggleStatus(todo.status);
    });
  });
};

display();

addBtn.addEventListener("click", async () => {
  const task = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;

  await postTodo({ task, description, priority, status: "incomplete" });

  display();
});

function priority(todo) {
  return todo.priority == "low"
    ? "green"
    : todo.priority == "medium"
    ? "yellow"
    : "red";
}

function toggleStatus(status) {
  return status == "complete" ? "incomplete" : "complete";
}
