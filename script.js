// La sagrada función que invoca una nueva tarea
function invokeTask(columnId) {
    // 1. Localiza el contenedor de la lista de tareas
    const taskList = document.querySelector(`#${columnId} .task-list`);
    
    // 2. Crea un nuevo elemento div que representará la tarea
    const newTask = document.createElement('div');
    newTask.classList.add('task-card');
    
    // 3. Define el contenido de la nueva tarea
    newTask.innerHTML = `
        <p>Nueva Tarea</p>
        <button class="delete-btn">Eliminar</button>
    `;
    newTask.setAttribute('draggable', 'true'); //draggable attribute

    // 4. Adjunta la nueva tarea a la lista de tareas en la columna
    taskList.appendChild(newTask);

    // 5. INFUNDE LÓGICA DE ELIMINACIÓN
    // Selecciona el botón de "Eliminar" dentro de la nueva tarea
    const deleteButton = newTask.querySelector('.delete-btn');

    // Agrega un "listener" que escuche el evento 'click' en el botón de eliminar
    deleteButton.addEventListener('click', () => {
        // Cuando el botón es clicado, elimina el elemento padre (la tarea)
        taskList.removeChild(newTask);
    });
}

// Escuchador de eventos para el botón de "Invocar Tarea"
const addButton = document.querySelector('.add-task-btn');

addButton.addEventListener('click', () => {
    invokeTask('pending-column');
});
