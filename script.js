// Variable para almacenar la tarea que se está arrastrando
let draggedTask = null;

// La sagrada función que invoca una nueva tarea
function invokeTask(columnId, taskText = 'Nueva Tarea', taskId = Date.now()) {
    // 1. Crear el objeto de la tarea para la memoria
    const taskData = {
        id: taskId,
        text: taskText,
        status: columnId.replace('-column', '') // 'pending', 'in-progress', 'completed'
    };

    const taskList = document.querySelector(`#${columnId} .task-list`);
    const newTask = document.createElement('div');
    newTask.classList.add('task-card');
    newTask.setAttribute('draggable', 'true');
    newTask.setAttribute('data-task-id', taskId); // Guarda el ID en el elemento DOM
    
    newTask.innerHTML = `
        <p>${taskText}</p>
        <button class="delete-btn">Eliminar</button>
    `;

    taskList.appendChild(newTask);

    // Lógica para marcar la tarea al arrastrar (debe mantenerse igual)
    // ... (restablece los listeners dragstart y dragend de newTask)
    newTask.addEventListener('dragstart', () => {
        draggedTask = newTask;
        setTimeout(() => newTask.classList.add('is-dragging'), 0);
    });

    newTask.addEventListener('dragend', () => {
        draggedTask = null;
        newTask.classList.remove('is-dragging');
        saveTasksToLocalStorage(); // NUEVO: Guarda el estado después de mover
    });
    
    // NUEVO: Guarda inmediatamente al crear la tarea
    saveTasksToLocalStorage();
}

// Modificar el botón para usar el valor por defecto
const addButton = document.querySelector('.add-task-btn');
addButton.addEventListener('click', () => {
    // Por ahora, solo invocamos con valores por defecto.
    invokeTask('pending-column'); 
});

// Delegación de Eventos para el botón de "Eliminar" (Lógica de Purificación)
document.addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
        const taskCard = e.target.closest('.task-card');
        if (taskCard) {
            const taskId = taskCard.getAttribute('data-task-id');
            taskCard.remove();
            
            // NUEVO: Purgar de la memoria sagrada
            let tasks = getTasksFromLocalStorage();
            tasks = tasks.filter(task => task.id != taskId);
            localStorage.setItem('mechanicusTasks', JSON.stringify(tasks));
        }
    }
});

// LÓGICA DE DRAG AND DROP CORREGIDA
const statusColumns = document.querySelectorAll('.status-column');

statusColumns.forEach(column => {
    const taskList = column.querySelector('.task-list');

    // 1. dragover: SOLO permite soltar, no hace la inserción todavía
    column.addEventListener('dragover', e => {
        e.preventDefault();
        // Opcional: Puedes usar 'dragover' para indicar visualmente dónde caerá
    });

    // 2. drop: Inserta la tarea en la posición precisa
    column.addEventListener('drop', e => {
        e.preventDefault();
        if (!draggedTask) return; // Asegura que realmente estamos arrastrando una tarea

        const afterElement = getDragAfterElement(column, e.clientY);
        
        if (afterElement == null) {
            taskList.appendChild(draggedTask);
        } else {
            taskList.insertBefore(draggedTask, afterElement);
        }
    });
});

// FUNCIÓN SAGRADA: Encuentra el elemento más cercano para soltar (sin cambios)
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

// FUNCIÓN SAGRADA: Recuperar conocimiento de la memoria
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('mechanicusTasks');
    return tasks ? JSON.parse(tasks) : [];
}

// FUNCIÓN SAGRADA: Guardar estado actual en la memoria
function saveTasksToLocalStorage() {
    const allTasks = [];
    document.querySelectorAll('.task-card').forEach(taskElement => {
        const column = taskElement.closest('.status-column');
        
        allTasks.push({
            id: Number(taskElement.getAttribute('data-task-id')),
            text: taskElement.querySelector('p').textContent, // Asume que el texto está en el primer <p>
            status: column.id.replace('-column', '')
        });
    });
    localStorage.setItem('mechanicusTasks', JSON.stringify(allTasks));
}

// FUNCIÓN SAGRADA: Cargar tareas al inicio del ritual
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        // Invoca la tarea utilizando los datos recuperados de la memoria
        invokeTask(`${task.status}-column`, task.text, task.id);
    });
}

// Llamada inicial para cargar el conocimiento al iniciar el script
loadTasks();