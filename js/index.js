const criteria = {
	default: 'Uncomplete',
	complete: 'Complete',
	none: 'All',
}
const addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', addTodo)

const form = document.getElementById('form')
form.addEventListener('submit', e => {
	e.preventDefault()
	addTodo()
})

let filterCriteria = criteria.none
const filter = document.getElementById('filter')
filter.childNodes.forEach(child => {
	child.addEventListener('click', e => {
		if (e.target.value === filter) return
		if (e.target.value === criteria.none) {
			filterCriteria = criteria.none
			clearFilter()
			return
		}
		const criterion = child.value.toLowerCase()
		const filteredTodos = filterTodoList(criterion)
		clearFilter()
		hideFilteredTodos(filteredTodos)
		filterCriteria = e.target.value
	})
})

const todoList = document.getElementById('todoList')
function filterTodoList(criterion) {
	if (todoList.childElementCount === 0) return
	const children = todoList.childNodes
	return (filteredTodos = Array.from(children).filter(
		todo => todo.dataset.state !== criterion
	))
}

function hideFilteredTodos(todos) {
	todos.forEach(todo => {
		todo.classList.add('hide')
	})
}

function clearFilter() {
	todoList.childNodes.forEach(todo => {
		todo.classList.remove('hide')
	})
}

function createTodo(todoContent) {
	const div = document.createElement('div')
	const li = document.createElement('li')
	const button = document.createElement('button')
	const input = document.createElement('input')

	div.classList.add('todo')
	button.classList.add('delete')
	input.type = 'checkbox'

	div.dataset.state = criteria.default

	button.textContent = '×'
	li.textContent = todoContent

	div.appendChild(input)
	div.appendChild(li).appendChild(button)

	button.addEventListener('click', () => {
		div.remove()
	})

	input.addEventListener('change', () => {
		div.classList.toggle('done')
		div.dataset.state = div.classList.contains('done')
			? criteria.complete
			: criteria.complete
		if (
			div.dataset.state !== filterCriteria &&
			filterCriteria !== criteria.none
		) {
			div.classList.add('hide')
		}
	})

	const modal = document.getElementById('modal')
	div.addEventListener('dblclick', e => {
		showModal(modal)
		editTodo(e.target)
	})

	return div
}

function addTodo() {
	const addItemInput = document.getElementById('newItem')
	const inputValue = addItemInput.value
	if (!inputValue) return
	const li = createTodo(inputValue)
	todoList.appendChild(li)
	addItemInput.value = ''
	addItemInput.focus
}

function editTodo(todo) {
	const editArea = document.getElementById('editArea')
	const saveButton = document.querySelector('.saveButton')
	const edit = todo.querySelector('li').firstChild
	editArea.value = edit.textContent
	editArea.focus()

	saveButton.addEventListener(
		'click',
		() => {
			edit.textContent = editArea.value
			saveButton.parentElement.classList.remove('show')
		},
		{ once: true }
	)
}

function showModal(modal) {
	modal.classList.add('show')
	modal.addEventListener('click', e => {
		if (e.target === modal) {
			modal.classList.remove('show')
		}
	})
}
