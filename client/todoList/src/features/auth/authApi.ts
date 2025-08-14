import axios from "axios";
import { type NavigateFunction } from "react-router";
import type { AddDispatch } from "../../store";
import { createError, createSuccess, resetNotification } from "../notification/notificationSlice";
import { setTokens } from "../intercaptor/interceptor";
import { API_URL } from "../intercaptor/interceptor";
import { loginSuccess } from "./authSlice";

interface IAuth{
    username:string,
    password:string,
    navigate: NavigateFunction,
    dispatch:AddDispatch

}

export  async function login({username,password, navigate,dispatch}:IAuth){
    try{
   const response  = await axios.post(`${API_URL}/login`,{
        username:username,
        password:password,
    })
    if(response && response.status === 200){
        localStorage.setItem("userId",response.data.id)
        setTokens(response.data.accessToken,response.data.refreshToken)
        dispatch(loginSuccess({accessToken:response.data.accessToken,refreshToken: response.data.refreshToken})
);
        dispatch(createSuccess("Авторизация прошла успешно"))
        setTimeout(()=>{
            navigate("/todos",{replace:true})
            dispatch(resetNotification())
        },2000)
    }
    }catch(error){
      console.error(error)
         if(axios.isAxiosError(error)) {
      dispatch(createError(`Message: ${error.message }`));
    }
    }
}


export async function registerUser({username,password,navigate,dispatch}:IAuth) {
    try{
        const response = await axios.post(`${API_URL}/register`,{
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
    }catch(error:unknown){
         if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
            dispatch(createError('Такой пользователь уже существует'));
        } else {
            dispatch(createError(`Ошибка: ${error.message}`));
        }
    } else {
        dispatch(createError('Неизвестная ошибка'));
    }}
}
