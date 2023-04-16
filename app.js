let todos = [];
document.addEventListener("DOMContentLoaded", event => {
  getInitialData();
  render();

  document.querySelector("#todoForm").addEventListener("submit", event => {
    event.preventDefault();
    const todo = document.querySelector("#todoForm input").value;
    if (todo.length==0) {
        alert("You didn't input any content");
    } else {
      todos.push({ title: todo, done: false });
      render();
      save();
      document.querySelector("#todoForm input").value = "";
    }
  });
})

function render() {
  const list = document.querySelector(`#todoList`);
  list.innerHTML = "";
  todos.forEach( (todo, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${todo.title}`;
      if (todo.done) {
        li.classList.add('done')
      } else {
        const doneButton = document.createElement("span");
        doneButton.classList.add('material-symbols-outlined');
        doneButton.innerText = 'task_alt';
        doneButton.addEventListener("click", () => {
            if (confirm("Do you want to validate this ?")) {
              todos[index] = { title: todo.title, done: true }
              render();
              save();
            }
        });
        li.appendChild(doneButton);
      }

      list.appendChild(li);
  })
}

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getInitialData() {
  if (localStorage.getItem('todos')) {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
}