const newItem = document.getElementById("new-item")
const addIcon = document.getElementById("fa")
const todoList = document.getElementById("todo-list")
let checksIcon = [...document.getElementsByClassName("check")]
let trashes = [...document.getElementsByClassName("trash")]

addIcon.addEventListener("click",addItem)

newItem.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        addItem() 
    }
})

function addListener() {
    checksIcon.forEach(checkIcon => {
        checkIcon.addEventListener("click", e => {
           const targetElt = e.target
           let liElt = targetElt.parentElement
           
            if (liElt.nodeName !== "LI") {
                liElt = liElt.parentElement
            }
    
           liElt.classList.add("checked")
           liElt.addEventListener("animationend", () => {
               liElt.classList.add("done","deleted")
               liElt.addEventListener("animationend", () =>{
                   todoList.removeChild(liElt)
               })
           })
        })
    })
    
    trashes.forEach(trash => {
        trash.addEventListener("click", e => {
            const targetElt = e.target
            let liElt = targetElt.parentElement
            
             if (liElt.nodeName !== "LI") {
                 liElt = liElt.parentElement
             }
    
             liElt.classList.add("deleted")
               liElt.addEventListener("animationend", () =>{
                   todoList.removeChild(liElt)
               })
        })
    })
}


function createItem(itemValue) {
    const li = document.createElement("li")
    const spanCheckIcon = document.createElement("span")
    const spanTrashIcon = document.createElement("span")
    const checkIcon = document.createElement("i")
    const trashIcon = document.createElement("i")

    li.classList.add("todo-item")
    li.innerText = itemValue

    spanCheckIcon.classList.add("icon", "check")
    checkIcon.classList.add("far","fa-check-circle")
    spanCheckIcon.appendChild(checkIcon)
    
    spanTrashIcon.classList.add("icon", "trash")
    trashIcon.classList.add("far","fa-trash-alt")
    spanTrashIcon.appendChild(trashIcon)

    li.appendChild(spanCheckIcon)
    li.appendChild(spanTrashIcon)

    return li
}

function addItem() {
    const itemValue = newItem.value
    if (itemValue) {
        const li = createItem(itemValue)
        todoList.appendChild(li)
        newItem.value = ""
        checksIcon = [...document.getElementsByClassName("check")]
        trashes = [...document.getElementsByClassName("trash")]
        addListener()
    }
}