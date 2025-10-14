import React from "react";
import Column from "./Column";

function Board() {
  const data = [
    {
      title: "Pendiente",
      tasks: ["Configurar entorno", "Diseñar UI", "Crear estructura base"],
    },
    {
      title: "En progreso",
      tasks: ["Componentizar la app", "Agregar estilos base"],
    },
    {
      title: "Completado",
      tasks: ["Instalar React"],
    },
  ];

  return (
    <div className="board">
      {data.map((col, i) => (
        <Column key={i} title={col.title} tasks={col.tasks} />
      ))}
    </div>
  );
}

export default Board;
