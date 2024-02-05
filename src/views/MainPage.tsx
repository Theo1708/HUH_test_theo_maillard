import './MainPage.css';

import { useState } from 'react';

import Task from '../components/Task';
import Filter from '../components/Filter';

import { selectToDoList, createTask, selectFilterIndex } from '../store/slices/toDoListSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import { FILTER_LIST } from '../components/Filter';

export default function MainPage() {
    const dispatch = useAppDispatch();
    const toDoList = useAppSelector(selectToDoList)

    const filterFunction = FILTER_LIST[useAppSelector(selectFilterIndex)]['filter']

    const [newTask, setNewTask] = useState<string>('')
    const [isAddButtonVisible, setIsAddButtonVisible] = useState<boolean>(false)

    const createHandler = () => {
        if (newTask === '') {
            window.alert(`Please input title before submitting`)
        } else {
            setNewTask('')
            dispatch(createTask(newTask))
        }
    }

    const handleKeyDown = (event : any) => {
        if (event.key === 'Enter') {
            createHandler()
        }
    }

    return (
        <div className="MainPage-container">
            <div className="MainPage-card">
                <div className='MainPage-header'>
                    <h2>To-do List</h2>
                    <Filter/>
                </div>
                <div className='MainPage-toDoListContainer'>
                    {toDoList.filter(filterFunction).map((task) => ( 
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