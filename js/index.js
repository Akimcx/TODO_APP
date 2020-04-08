const app = document.getElementById("app")
const modal = document.getElementById("modal")
const newItem = document.getElementById("newItem")
const deleteItem = document.getElementById("deleteItem")
const add = document.getElementById("add")
const cancel = document.getElementById("cancel")
modal.style.width = app.clientWidth / 2 + "px"
modal.style.left = (app.clientWidth - modal.clientWidth) / 2 + "px"

newItem.addEventListener("click", e => {
    e.preventDefault()
    modal.classList.remove("see")
    modal.classList.add("fade-in")
})

cancel.addEventListener("click", e => {
    e.preventDefault()
    modal.classList.remove("fade-in")
    modal.classList.add("see")
})
