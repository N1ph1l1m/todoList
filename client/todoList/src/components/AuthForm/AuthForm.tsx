
import { useLocation} from "react-router";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { login,registerUser } from "../../features/auth/authApi";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createError, resetNotification} from "../../features/notification/notificationSlice";
import type { RootState } from "../../store";

const AuthForm = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const navigate = useNavigate()
    const location  = useLocation()
    const dispatch = useDispatch()
    const isLogin = location.pathname === "/login";

    const {status,textMessage} = useSelector((state:RootState)=>state.notificationSlice)

    const title  = isLogin ? "Вход" : "Регистрация"
    const titleButton  =  isLogin ? "Войти" : "Регистрация"
    const isLoginLink  = !isLogin ?  "Вход" : "Регистрация"


    useEffect(()=>{
      dispatch(resetNotification())
    },[])

     function handleInput(e:ChangeEvent<HTMLInputElement>,setInput: React.Dispatch<React.SetStateAction<string>>){
        setInput(e.target.value)
    }

    function clearForm(){
        setUsername('')
        setPassword('')
        setConfirmPassword('')
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
         e.preventDefault();
         if(isLogin){
            await   login({username,password,navigate,dispatch})
            clearForm()
         }else{

            if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
            dispatch(  createError("Заполните все поля"))
        return;
        }
        if (password.length < 6) {
            dispatch(createError("Пароль должен быть не менее 6 символов"))
        return;
        }
        if (password !== confirmPassword) {
            dispatch(createError("Пароли не совпадают"))
        return;
        }
        await registerUser({username,password,navigate,dispatch})
        clearForm()
         }
    }

    function changeForm(){
        dispatch(resetNotification())
        if(isLogin){
            navigate("/register")
        }else{
            navigate("/login")
        }
    }

    return (
<div  className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
  <div className="w-90 max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 ">
    <h1 className="text-blue-500 dark:text-sky-400 text-3xl text-center">{title}</h1>
    <span className={`text-center ${status === "success" ? "text-green-500" : "text-red-500"}`}>
      {textMessage}
    </span>

    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className="block w-full border rounded p-2"
        type="text"
        value={username}
        onChange={(e) => handleInput(e, setUsername)}
        placeholder="Имя пользователя"
        required
      />

      <input
        className="block w-full border rounded p-2"
        type="password"
        value={password}
        onChange={(e) => handleInput(e, setPassword)}
        placeholder="Пароль"
        required
      />

      {!isLogin && (
        <input
          className="block w-full border rounded p-2"
          type="password"
          value={confirmPassword}
          onChange={(e) => handleInput(e, setConfirmPassword)}
          placeholder="Подтвердите пароль"
          required
        />
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        {titleButton}
      </button>
    </form>

    <div className="text-center">
      <span className="mr-2">У вас есть аккаунт?</span>
      <button
        onClick={() => changeForm()}
        className="text-blue-500 hover:underline">
        {isLoginLink}
      </button>
    </div>
  </div>
</div>

    );
};

export default AuthForm;
