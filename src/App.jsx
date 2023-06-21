import React, { useEffect, useState } from "react";

// COMPONENTS
import TaskForm from './components/TaskForm';
import Task from './components/Task';

function App() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks || []);
  }, []);

  function addTask(name) {
    setTasks(prev => {
      return [...prev, {name:name,done:false}];
    });
  }

  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject,index) => index !== indexToRemove);
    });
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = numberComplete/numberTotal * 100;
    if (percentage === 0) {
      return '👷 Pongamonos a trabajar 👷';
    }
    if (percentage === 100) {
      return '🎉 Misión cumplida 🎉';
    }
    return '💪🏻 Sigamos en marcha 💪🏻';
  }

  function renameTask(index,newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    })
  }

  return (

    <main className="max-w-xl m-[20px_auto] px-5 bg-emerald-700 border-2 border-solid border-emerald-900 rounded-md p-3">

      <h1 className="text-center text-[2rem] mb-2 uppercase">{numberComplete}/{numberTotal} Tareas completadas</h1>
      <h2 className="text-center text-[1.5rem] mb-5">{getMessage()}</h2>

      <TaskForm onAdd={addTask} />

      {tasks.map((task,index) => (
        <Task {...task}
          onRename={newName => renameTask(index,newName)}
          onTrash={() => removeTask(index)}
          onToggle={done => updateTaskDone(index, done)} 
        />
      ))}

    </main>

  );
}

export default App;
