import React, { useState } from "react";

export default function TaskForm({onAdd}) {

  const [taskName,setTaskName] = useState('');

  function handleSubmit(ev) {
    ev.preventDefault();
    onAdd(taskName);
    setTaskName('');
  }

  return (
    
    <form onSubmit={handleSubmit} className="border-2 border-solid border-gray-700 rounded-lg p-1 flex">
      
      <button className="border-0 bg-emerald-500 rounded-md cursor-pointer px-1 text-[30px] hover:bg-emerald-600 transition-all">+</button>

      <input 
        type="text"
        value={taskName}
        onChange={ev => setTaskName(ev.target.value)}
        placeholder="Agrega una nueva tarea"
        className="bg-transparent text-white border-0 py-2 px-3 ml-2 block w-full text-[20px]"
      />

    </form>

  );
}