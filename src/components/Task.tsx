import './Task.css';

import { useState } from 'react';

import { IoIosCheckmark } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";

export default function Task (props : {title : string, completed : boolean, id : number})  {
    const [areOptionsVisible, setAreOptionsVisible] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(props.title)

    const deleteHandler = () => {
        console.log('delete task', props.title)
    }

    const editHandler = (title : string, completed : boolean) => {
        if (title === '') {
            window.alert('Please input a title before submitting')
        } else {
            const task = {
                id : props.id,
                title,
                completed 
            }
            console.log('edit task', task)
            setIsEditing(false)
        }
    }

    const handleKeyDown = (event : any) => {
        if (event.key === 'Enter'){
            editHandler(newTitle, props.completed)
        }
    }

    return (
        <div className="Task-container">
            {isEditing ?
                <>
                    <input 
                        type='text' 
                        style={{flexGrow:1}}
                        value={newTitle}
                        placeholder='A title is needed for edition...' 
                        onChange={(event) => {setNewTitle(event.target.value)}}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={() => editHandler(newTitle, props.completed)}>Save</button>
                </>
                :
                <>
                    <p className='Task-content'> 
                        <span 
                            className='Task-checkmarkContainer' 
                            style = {{ 
                                backgroundColor : props.completed ? 'var(--PURPLE_THEME)' : undefined, 
                                border : props.completed ? undefined : '2px solid var(--PURPLE_THEME)'
                            }}
                            onClick={() => {editHandler(props.title, !props.completed)}}
                        >
                            {props.completed ? 
                                <IoIosCheckmark className='Task-checkmark'/>
                                : null
                            }
                        </span>
                        <span 
                            className='Task-title'
                            style={{
                                color : props.completed ? 'var(--TODO_COMPLETED)' : undefined,
                                textDecoration: props.completed ? 'line-through' : undefined
                            }}
                        >
                            {props.title}
                        </span>          
                    </p>
                    <div className='Task-edit' onMouseLeave={() => {setAreOptionsVisible(false)}}>
                        <BsThreeDots className='Task-dotsIcon' onClick={() => setAreOptionsVisible(true)}/>
                        {areOptionsVisible?
                            <div className='Task-editContainer'>
                                <p className='Task-editText' onClick={() => {setIsEditing(true); setAreOptionsVisible(false)}}>Edit</p>
                                <p className='Task-deleteText' onClick={deleteHandler}>Delete</p>
                            </div>
                            : null
                        }
                    </div>
                </>
            }
        </div>
    )
}