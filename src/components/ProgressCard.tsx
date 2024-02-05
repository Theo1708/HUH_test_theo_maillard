import './ProgressCard.css';

export default function ProgressCard (props : {toDoList : ToDoList})  {
    const completedTotal = props.toDoList.filter(task => task.completed === true).length
    
    return (
        <div className="ProgressCard-container">
            <p className="ProgressCard-title">Progress</p>
            <div className="ProgressCard-progressBar">
                <div 
                    className="ProgressCard-progress"
                    style={{width:`${100*completedTotal/props.toDoList.length}%`}}
                >
                </div>
            </div>
            <p className="ProgressCard-subTitle">{completedTotal} Tasks completed</p>
        </div>

    )
}