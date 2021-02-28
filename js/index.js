const addItemInput = document.getElementById("newItem")
const form = document.getElementById("form")
const addBtn = document.getElementById("addBtn")
const todoList = document.getElementById("todoList")

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

    div.addEventListener('dblclick', e => {
        showEditionModal()
        editTodo(e.target)
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

function showEditionModal() {
    const modal = document.getElementById('modal')
    modal.classList.add('show')
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            hideEditionModal()
        }
    })
}

function editTodo(todo) {
    const editArea = document.getElementById('editArea')
    const saveButton = document.querySelector('.saveButton')
    const edit = todo.querySelector('li').firstChild
    editArea.value = edit.textContent
    editArea.focus()

    saveButton.addEventListener('click', () => {
        console.log(`edit content: ${edit.textContent} | editArea content: ${editArea.value}`);
        edit.textContent = editArea.value
        console.log(`edit content: ${edit.textContent} | editArea content: ${editArea.value}`);
        hideEditionModal()
    }, { once: true })
}

function hideEditionModal() {
    const modal = document.getElementById('modal')
    modal.classList.remove('show')
}