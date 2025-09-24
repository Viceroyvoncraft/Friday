// La sagrada función que invoca una nueva tarea
function invokeTask(columnId) {
    // 1. Localiza el contenedor de la lista de tareas
    const taskList = document.querySelector(`#${columnId} .task-list`);
    
    // 2. Crea un nuevo elemento div que representará la tarea
    const newTask = document.createElement('div');
    newTask.classList.add('task-card');
    
    // 3. Define el contenido de la nueva tarea
    // Por ahora, será un simple texto. Más adelante, podremos hacer que el usuario lo ingrese.
    newTask.innerHTML = `
        <p>Nueva Tarea</p>
        <button class="delete-btn">Eliminar</button>
    `;

    // 4. Adjunta la nueva tarea a la lista de tareas en la columna
    taskList.appendChild(newTask);
}

// Escuchador de eventos para el botón de "Invocar Tarea"
// 1. Selecciona el botón por su clase
const addButton = document.querySelector('.add-task-btn');

// 2. Agrega un "listener" que escucha el evento 'click'
addButton.addEventListener('click', () => {
    // Cuando el botón es clicado, invoca la función para la columna de "Pendiente"
    invokeTask('pending-column');
});
