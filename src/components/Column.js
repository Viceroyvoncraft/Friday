import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

function Column({ id, title, tasks }) {
  return (
    <div className="column">
      <h2>{title}</h2>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((t, i) => (
              <Task key={t.id} id={t.id} index={i} title={t.title} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
