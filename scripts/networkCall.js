const getTodos = async () => {
  const res = await fetch("http://localhost:3001/api/todos")
    .then((res) => res.json())
    .then((data) => data);
  return res;
};

const delTodo = async (todoID) => {
  const res = await fetch("http://localhost:3001/api/todos/" + todoID, {
    method: "DELETE",
  });
  console.log(res);
  return res;
};

const postTodo = async (todo) => {
  const res = await fetch("http://localhost:3001/api/todos/", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(todo),
  });
  return res;
};

const editTodo = async (todo) => {
  const res = await fetch("http://localhost:3001/api/todos/" + todo.id, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(todo),
  });
  console.log(res)
  return res;
};

export { getTodos, delTodo, postTodo, editTodo };
