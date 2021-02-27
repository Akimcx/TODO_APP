const addItemInput = document.getElementById("newItem")
const form = document.getElementById("form")
const addBtn = document.getElementById("addBtn")
const todoList = document.getElementById("todoList")
let checksIcon = [...document.getElementsByClassName("check")]
let trashes = [...document.getElementsByClassName("trash")]

addBtn.addEventListener("click", addTodo)

form.addEventListener("submit", e => {
    e.preventDefault()
    addTodo()
})

function createTodo(todoContent) {
    const div = document.createElement("div")
    const li = document.createElement("li")
    const button = document.createElement("button")
    const input = document.createElement("input")

    div.classList.add("todo")
    button.classList.add("delete")
    input.type = "checkbox"

    button.textContent = '×'
    li.textContent = todoContent

    div.appendChild(input)
    div.appendChild(li).appendChild(button)

    button.addEventListener("click", () => {
        div.remove()
    })

    input.addEventListener("change", () => {
        div.classList.toggle("done")
    })

    return div
}

function addTodo() {
    const inputValue = addItemInput.value
    if (inputValue) {
        const li = createTodo(inputValue)
        todoList.appendChild(li)
        addItemInput.value = ""
        addItemInput.focus
    }
}