// La sagrada función que invoca una nueva tarea
function invokeTask(columnId) {
    const taskList = document.querySelector(`#${columnId} .task-list`);
    const newTask = document.createElement('div');
    newTask.classList.add('task-card');
    newTask.setAttribute('draggable', 'true');
    
    newTask.innerHTML = `
        <p>Nueva Tarea</p>
        <button class="delete-btn">Eliminar</button>
    `;

    taskList.appendChild(newTask);
}

// Escuchador de eventos para el botón de "Invocar Tarea"
const addButton = document.querySelector('.add-task-btn');

addButton.addEventListener('click', () => {
    invokeTask('pending-column');
});

// NUEVA LÓGICA: Delegación de Eventos para el botón de "Eliminar"
document.addEventListener('click', e => {
    // Verificamos si el elemento clickeado tiene la clase 'delete-btn'
    if (e.target.classList.contains('delete-btn')) {
        // Encontramos el elemento padre que es la tarea completa
        const taskCard = e.target.closest('.task-card');
        if (taskCard) {
            // Removemos la tarea del DOM
            taskCard.remove();
        }
    }
});

// Lógica para arrastrar y soltar
const statusColumns = document.querySelectorAll('.status-column');

statusColumns.forEach(column => {
    column.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(column, e.clientY);
        const draggedTask = document.querySelector('.is-dragging');
        const taskList = column.querySelector('.task-list');
        if (afterElement == null) {
            taskList.appendChild(draggedTask);
        } else {
            taskList.insertBefore(draggedTask, afterElement);
        }
    });
});

function getDragAfterElement(column, y) {
    const draggableTasks = [...column.querySelectorAll('.task-card:not(.is-dragging)')];
    return draggableTasks.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
