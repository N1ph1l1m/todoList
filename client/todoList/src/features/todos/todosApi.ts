

import axios from "axios";
import type { AddDispatch } from "../../store";
import axiosInstance from "../intercaptor/interceptor";
import { createError } from "../notification/notificationSlice";
import { createTask, deleteTodo, getServerData, toggleTodo } from "./todosSlice";
import { resetNotification } from "../notification/notificationSlice";

export async function getTodos(dispatch:AddDispatch){
    dispatch(resetNotification())
try{
    const response = await axiosInstance.get("/todos");
    if(response && response.status === 200){
        dispatch(getServerData(response.data))
    }
}catch(error){
        if(axios.isAxiosError(error)) {
      dispatch(createError(`Message: ${error.message } |  StatusText: ${error.response?.statusText}`));
    }

}
}


export async function createTodo(userId:string, name:string,dispatch:AddDispatch){
      dispatch(resetNotification())
    try{
        const response =  await axiosInstance.post('/todos',{
            userId:userId,
            title:name
        })
        if(response && response.status == 201){
            dispatch((createTask({id:response.data.id,title:response.data.title})))
        }
    }catch(error){
            if(axios.isAxiosError(error)) {
      dispatch(createError(`Message: ${error.message }`));
    }
    }
}


export async function completeTodo(id:number,dispatch:AddDispatch) {
      dispatch(resetNotification())
    try{
        const response  = await axiosInstance.put(`/todos/${id}`)
         if(response && response.status == 200){
            dispatch(toggleTodo(id))
         }
    }catch(error){
     if(axios.isAxiosError(error)) {
      dispatch(createError(`Message: ${error.message }`));
    }
    }
}


export async function deleteTodoItem(id:number,dispatch:AddDispatch) {
      dispatch(resetNotification())
    try{
        const response  = await axiosInstance.delete(`/todos/${id}`)
         if(response && response.status == 200){
            dispatch(deleteTodo(id))
         }
    }catch(error){
         if(axios.isAxiosError(error)) {
      dispatch(createError(`Message: ${error.message }`));
    }
    }
}
