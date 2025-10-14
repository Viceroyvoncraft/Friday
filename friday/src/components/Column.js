import React from "react";
import Task from "./Task";

function Column({ title, tasks }) {
  return (
    <div className="column">
      <h2>{title}</h2>
      {tasks.map((t, i) => (
        <Task key={i} title={t} />
      ))}
    </div>
  );
}

export default Column;
