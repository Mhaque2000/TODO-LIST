const taskDescription = document.querySelector('.task-description')
const addTask = document.querySelector('#add-task')
const parentElement = document.querySelector('#root')

const button = (name) => {
    const createButton = document.createElement('button')
    createButton.classList.add(name)
    createButton.innerText = name.charAt(0).toUpperCase() + name.slice(1)
    return createButton
}

const newTaskElement = (taskAdded) => {
    const taskContainer = document.createElement('div')
    taskContainer.classList.add('task-container')

    const textarea = document.createElement("textarea");
    textarea.classList.add('task-textarea', 'disabled');
    textarea.disabled = true;
    textarea.innerText = taskAdded

    const action = document.createElement('div')
    action.classList.add('action')
    const editButton = button('edit')
    const deleteButton = button('delete')
    const inprogressButton = button('inprogress')
    const completedButton = button('completed')
    const saveButton = button('save')
    action.insertAdjacentElement('beforeend', editButton);
    action.insertAdjacentElement('beforeend', deleteButton);
    action.insertAdjacentElement('beforeend', inprogressButton);

    taskContainer.insertAdjacentElement('beforeend', textarea);
    taskContainer.insertAdjacentElement('beforeend', action);

    parentElement.appendChild(taskContainer)

    inprogressButton.addEventListener('click', () => {
        textarea.classList.add('line-through')
        action.replaceChild(completedButton, inprogressButton);
        editButton.classList.add('display-none')
    });

    completedButton.addEventListener('click', () => {
        textarea.classList.remove('line-through')
        action.replaceChild(inprogressButton, completedButton);
        editButton.classList.add('display-none')
    });

    deleteButton.addEventListener('click', () => {
        taskContainer.remove()
    })
    editButton.addEventListener('click', () => {
        textarea.disabled = false;
        textarea.classList.remove('disabled');
        action.replaceChild(saveButton, editButton);
    })
    saveButton.addEventListener('click', () => {
        textarea.disabled = true;
        textarea.classList.add('disabled');
        action.replaceChild(editButton, saveButton);
    })

}


addTask.addEventListener('click', () => {
    let taskAdded = taskDescription.value
    if (taskAdded === '') {
        alert('please enter a task')
        return
    }
    console.log(taskAdded)
    newTaskElement(taskAdded)
    taskDescription.value = ''
})

