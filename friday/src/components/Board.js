import React, { useState } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

function Board() {
  const [data, setData] = useState([
    {
      id: "col-1",
      title: "Pendiente",
      tasks: [
        { id: "t1", title: "Configurar entorno" },
        { id: "t2", title: "Diseñar UI" },
        { id: "t3", title: "Crear estructura base" },
      ],
    },
    {
      id: "col-2",
      title: "En progreso",
      tasks: [
        { id: "t4", title: "Componentizar la app" },
        { id: "t5", title: "Agregar estilos base" },
      ],
    },
    {
      id: "col-3",
      title: "Completado",
      tasks: [{ id: "t6", title: "Instalar React" }],
    },
  ]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // Si no se suelta en una zona válida, no hacer nada
    if (!destination) return;

    // Si se suelta en la misma posición, no hacer nada
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const newData = [...data];
    const sourceColIndex = data.findIndex(
      (col) => col.id === source.droppableId
    );
    const destColIndex = data.findIndex(
      (col) => col.id === destination.droppableId
    );

    const sourceCol = { ...data[sourceColIndex] };
    const destCol = { ...data[destColIndex] };

    const [movedTask] = sourceCol.tasks.splice(source.index, 1);

    // Si se mueve dentro de la misma columna
    if (sourceCol.id === destCol.id) {
      sourceCol.tasks.splice(destination.index, 0, movedTask);
      newData[sourceColIndex] = sourceCol;
    } else {
      destCol.tasks.splice(destination.index, 0, movedTask);
      newData[sourceColIndex] = sourceCol;
      newData[destColIndex] = destCol;
    }

    setData(newData);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board">
        {data.map((col) => (
          <Column key={col.id} id={col.id} title={col.title} tasks={col.tasks} />
        ))}
      </div>
    </DragDropContext>
  );
}

export default Board;
