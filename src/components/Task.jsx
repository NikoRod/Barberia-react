import React, { useState } from "react";

// COMPONENTS
import Checkbox from "./Checkbox";

export default function Task({ name, done, onToggle, onTrash, onRename }) {

  const [editMode, setEditMode] = useState(false);

  return (

    <div className={'bg-gray-700 rounded-lg p-[5px_9px] mt-1 flex items-center transition-opacity text-[20px]'
      + (done ? 'opacity-30 text-[20px] text-slate-400 bg-gray-800' : '')}
    >

      <Checkbox checked={done} onClick={() => onToggle(!done)} />
      {!editMode && (
        <div className="grow" onClick={() => setEditMode(prev => !prev)}>

          <span className={`relative ease-linear select-none`
            + (done ? 'before:block before:w-full before:h-[2px] before:bg-white before:absolute before:top-[16px] before:transition-[w-1] before:duration-100 before:ease-linear' : '')}>{name}
          </span>

        </div>
      )}

      {editMode && (
        <form onSubmit={ev => {ev.preventDefault();setEditMode(false);}} className="grow">

          <input 
            type="text" 
            value={name}
            onChange={ev => onRename(ev.target.value)}
            className="p-[2px_4px] bg-transparent"
          />

        </form>
      )}

      <button className="bg-none border-none flex cursor-pointer" onClick={onTrash}>

        <svg className="h-6 fill-gray-900 hover:fill-slate-400 transition-all" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>

      </button>

    </div>

  );
}