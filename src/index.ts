import {v4 as uuidV4} from 'uuid'


const list = document.querySelector<HTMLUListElement>('#list')
const form = document.querySelector<HTMLFormElement>('#task-form')
const input = document.querySelector<HTMLInputElement>('#task-title')

type taskType={
    id: string,
    title: string,
    completed: boolean,
    createdAt: Date
}
const taskArr:taskType[] = loadTask()
taskArr.forEach(addListItem)

form?.addEventListener("submit", e=>{
    
    if(input?.value == "" || input?.value == null) return
    
    const task = {
        id: uuidV4(),
        title: input.value,
        completed: false,
        createdAt: new Date()
    }

    taskArr.push(task)

    addListItem(task);
    input.value=""
    alert("Todo created successfully")
})

function addListItem(task: taskType){
    const item =document.createElement("li")
    const label=document.createElement("label")
    const checkbox=document.createElement("input")
    checkbox.type="checkbox"

    checkbox.addEventListener("change",()=>{
        task.completed=checkbox.checked
    })

    label.append(checkbox,task.title)
    item.append(label)
    list?.append(item)
    saveTask()
}

function saveTask(){
    localStorage.setItem("Tasks",JSON.stringify(taskArr))
}
function loadTask(){
    const taskJson=localStorage.getItem("Tasks")
    if(taskJson == null) return []

    return JSON.parse(taskJson)
}
