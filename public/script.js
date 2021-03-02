function getAllTodos() {

    axios.get("/api/todos")
    .then(res => {
        console.log(res.data)


        const todosContainer = document.querySelector("#todosContainer")
        const todosHtml = res.data.map(todo => {
            return `<li class="${todo.completed ? "complete" : "incomplete"}">
            ${todo.description}
            <button onclick="deleteTodo('${todo.id}')">🗑</button>
            <input type="text" class="inputForm data-id-${todo.id}" value="${todo.description}" /><button onclick="editTodo('${todo.id}')">Edit</button>
            <button onclick="setCompleteStatus('${todo.id}', '${!todo.completed}')">
            ${todo.completed ? '❎' :'✅'}
            </button>
            </li>`


        }).join("")

        todosContainer.innerHTML = todosHtml
    });
}


function setCompleteStatus(id, status) {
    axios.patch(`/api/todos/${id}`, {
        completed: status
    })
    .then(() => {
        getAllTodos();
    })
}



function addNewTodo(description) {
    return axios.post("/api/todos", {
        description: description 
    })
}

function deleteTodo(id) {
    axios.delete(`/api/todos/${id}`)
    .then(() => {
        getAllTodos();
    })
}

getAllTodos();

const todosForm = document.querySelector("#todosForm")
todosForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = e.target.elements.description.value
    addNewTodo(description)
    .then(() => {
        todosForm.reset()
        getAllTodos()
    })
})


function editTodo(id) {
    const todosForm = document.querySelector(`.data-id-${id}`)
        console.log(todosForm.value)
    axios.patch(`/api/todos/${id}`, {
        description: todosForm.value
    })
    .then(() => {
        getAllTodos();
    // }) .catch((err) => {
    //     let errText = err?.res?.data?.err
    //     alert("could not update: " + errText )
 })
}


function edit2Todo(id) {
    const todosForm = document.querySelector(".inputForm")
}