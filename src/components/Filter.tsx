import './Filter.css';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeFilterIndex, selectFilterIndex } from '../store/slices/toDoListSlice';
import { IoChevronDown } from "react-icons/io5";

export const FILTER_LIST : Filter[] = [
    {
        name : 'All',
        filter : (task : SingleTask) => {return true}
    },
    {
        name : 'Done',
        filter : (task : SingleTask) => {return task.completed}
    },
    {
        name : 'Undone',
        filter : (task : SingleTask) => {return !task.completed}
    }
]

export default function Filter () {
    const dispatch = useAppDispatch()
    const filterName = FILTER_LIST[useAppSelector(selectFilterIndex)].name
    const [isListVisible, setIsListVisible] = useState<boolean>(false)

    const choseFilter = (index : number) => {
        dispatch(changeFilterIndex(index))
    }

    return (
        <div 
            className='Filter-container' 
            onClick={() => {setIsListVisible(!isListVisible)}}
            onMouseLeave={() => setIsListVisible(false)}
            onMouseEnter={() => setIsListVisible(true)}
        >
            <span>{filterName}</span>
            <IoChevronDown/>
            {isListVisible ?
                <div className='Filter-listContainer'>
                    <div className='Filter-list'>
                        {FILTER_LIST.map((filter, index) => 
                            <span
                                key={filter.name}
                                style={{
                                    backgroundColor : filter.name === filterName ? 'var(--PURPLE_THEME)' : undefined,
                                    color : filter.name === filterName ? 'var(--WHITE)' : undefined
                                }}
                                onClick={() => choseFilter(index)}
                            >
                                {filter.name}
                            </span>
                        )}
                    </div>
                </div>
                : null
            }
        </div> 
    )
    
}