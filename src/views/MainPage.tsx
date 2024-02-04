import './MainPage.css';

import { useState } from 'react';

import Task from '../components/Task';

// Cette variable sera remplacée par un state globale par la suite 
const toDoList : ToDoList = [
    {
        id : 1,
        title : 'title1', 
        completed : true

    },
    {
        id : 2,
        title : 'title2', 
        completed : true
    },
    {
        id : 3,
        title : 'title3', 
        completed : true
    },
    {
        id : 4,
        title : 'title4', 
        completed : false

    },
    {
        id : 5,
        title : 'title5', 
        completed : false
    },
    {
        id : 6,
        title : 'title6', 
        completed : false
    }
]

export default function MainPage() {
    const [newTask, setNewTask] = useState<string>('')
    const [isAddButtonVisible, setIsAddButtonVisible] = useState<boolean>(false)

    const createHandler = () => {
        console.log('create task', newTask)
        setNewTask('')
    }

    const handleKeyDown = (event : any) => {
        if (event.key === 'Enter') {
            createHandler()
        }
    }

    return (
        <div className="MainPage-container">
            <div className="MainPage-card">
                <h2>To-do List</h2>
                <div className='MainPage-toDoListContainer'>
                    {toDoList.map((task) => ( 
                        <Task
                            id={task.id}
                            key={task.id}
                            title={task.title}
                            completed={task.completed}
                        />
                    ))}
                </div>
                <div 
                    className='MainPage-inputContainer'
                    onFocus={() => setIsAddButtonVisible(true)}
                    onBlur={(e)=>{e.relatedTarget === null && setIsAddButtonVisible(false)}}
                >
                    <input
                        type='text' 
                        value={newTask}
                        placeholder='Add your todo...' 
                        className='MainPage-inputText'
                        onChange={(event) => {setNewTask(event.target.value)}}
                        onKeyDown={handleKeyDown}
                    />
                    {isAddButtonVisible ?
                        <button 
                            className='MainPage-addButton' 
                            onClick={createHandler}
                        >
                            Add
                        </button>
                        : null
                    }
                </div>
            </div>
        </div>
    );
}