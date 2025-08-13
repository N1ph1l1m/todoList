import axios from "axios";

import { type NavigateFunction } from "react-router";
import type { AddDispatch } from "../../store";
import { createError, createSuccess, resetNotification } from "../notification/notificationSlice";
import { setTokens } from "../intercaptor/interceptor";


const URL  = 'http://localhost:3000'

interface IAuth{
    username:string,
    password:string,
    navigate: NavigateFunction,
    dispatch:AddDispatch

}

export  async function login({username,password, navigate,dispatch}:IAuth){
    try{
   const response  = await axios.post(`${URL}/login`,{
        username:username,
        password:password,

    })
    if(response && response.status === 200){
        console.log(response.data);
        localStorage.setItem("userId",response.data.id)
        setTokens(response.data.accessToken,response.data.refreshToken)
        dispatch(createSuccess("Авторизация прошла успешно"))
        setTimeout(()=>{
            navigate("/todos",{replace:true})
            dispatch(resetNotification())
        },2000)
        console.log(response);
    }
    }catch(error){
      console.error(error)
        if (axios.isAxiosError(error) && error.response?.status === 401) {
      dispatch(createError(`${error.response.data.error}`));
    }
    }
}


export async function registerUser({username,password,navigate,dispatch}:IAuth) {
    try{
        const response = await axios.post(`${URL}/register`,{
            username:username,
            password:password
        })
        console.log(response);
         if(response && response.status === 200){
               dispatch(createSuccess("Регистрация прошла успешно"))
            setTimeout(()=>{
            navigate("/login",{replace:true})
            dispatch(resetNotification())
        },1000)
         }
    }catch(error){
        if (axios.isAxiosError(error) && error.response?.status === 500) {
      dispatch(createError('Такой пользователь уже существует '));
    }

    }
}
