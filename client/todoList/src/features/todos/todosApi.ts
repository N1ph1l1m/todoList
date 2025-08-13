
import type { AddDispatch } from "../../store";
import axiosInstance from "../intercaptor/interceptor";
import { createTask, deleteTodo, getServerData, toggleTodo } from "./todosSlice";


export async function getTodos(dispatch:AddDispatch){
try{
    const response = await axiosInstance.get("/todos");
    if(response && response.status === 200){
        dispatch(getServerData(response.data))
    }
}catch(error){
    console.error(error)
}
}


export async function createTodo(userId:string, name:string,dispatch:AddDispatch){
    try{
        const response =  await axiosInstance.post('/todos',{
            userId:userId,
            title:name
        })
        if(response && response.status == 201){
            dispatch((createTask({id:response.data.id,title:response.data.title})))
        }
    }catch(error){
        console.error(error)
    }
}


export async function completeTodo(id:number,dispatch:AddDispatch) {
    try{
        const response  = await axiosInstance.put(`/todos/${id}`)
         if(response && response.status == 200){
            dispatch(toggleTodo(id))
         }
    }catch(error){
        console.error(error)
    }
}


export async function deleteTodoItem(id:number,dispatch:AddDispatch) {
    try{
        const response  = await axiosInstance.delete(`/todos/${id}`)
         if(response && response.status == 200){
            dispatch(deleteTodo(id))
         }
    }catch(error){
        console.error(error)
    }
}