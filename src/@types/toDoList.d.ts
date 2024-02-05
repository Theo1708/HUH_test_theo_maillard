interface toDoListState {
    toDoList : ToDoList,
    filterIndex : number
}

type ToDoList = SingleTask[]

interface SingleTask {
    id : string,
    title : string,
    completed : boolean
}

type FilterName = 'All' | 'Done' | 'Undone'

interface Filter {
    name : FilterName
    filter(task : SingleTask) : boolean
}