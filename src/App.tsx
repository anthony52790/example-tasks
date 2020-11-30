import React, { useState } from 'react';
import './App.css';

//Declaracion abreviada elemento form html
type FormElement = React.FormEvent<HTMLFormElement>;

//Creacion de un interface declarando el tipo de valores
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  //declaro tipo de estado
  const [newTask, setNewTask] = useState<string>('');
  //inicializando con arreglo vacio la lista de tareas ([])
  //lista de tareas basado en una interface ITask[]
  const [tasks, setTasks] = useState<ITask[]>([]);

  const handSubmit = (e: FormElement) => {
    e.preventDefault();
    //Agrego una nueva tarea que se tenga en el estado
    if (newTask !== '') {
      addTask(newTask);
      setNewTask('');
    }
    return;
  }

  //agregar nueva tarea
  const addTask = (name: string) => {
    //Esta variable es un arreglo de tipo ITask
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    //establecer en el estado setTasks
    setTasks(newTasks);
  }
  //tachar si se realizo o no
  const toggleDone = (i:number) => {
    const newTasks:ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  }
  //remover tarea
  const removeTask = (i:number) => {
    const newTasks:ITask[] = [...tasks];
    newTasks.splice(i,1);
    setTasks(newTasks);
  }
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handSubmit} action="">
                <input className="form-control" type="text" onChange={e => setNewTask(e.target.value)} value={newTask} autoFocus />
                <button className="btn btn-success btn-block mt-2">save</button>
              </form>
            </div>
          </div>
          {
            tasks.map((t: ITask, i: number) => (
              <div className="card card-body mt-2" key={i}>
                <h2 style={{textDecoration: t.done ? 'line-through' : ''}}>{t.name}</h2>
                <div>
                  <button className="btn btn-secondary" onClick={() => toggleDone(i)}>{t.done ? '✓' : '✗'}</button>
                  <button className="btn btn-danger" onClick={() => removeTask(i)}>🗑</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
