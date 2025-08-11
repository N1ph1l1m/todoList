
import { useLocation} from "react-router";
import { useState, type ChangeEvent, type FormEvent } from "react";

const AuthForm = () => {
    const [login,setLogin] = useState('')
    const [password,setPassword] = useState('')


    function handleLogin(e:ChangeEvent<HTMLInputElement>){
        setLogin(e.target.value)
    }

    function handlePassword(e:ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value)
    }
    const location  = useLocation()

    function logIn(e: FormEvent<HTMLFormElement>){
         e.preventDefault();
        console.log(` login: ${login} \n   password:${password}`  )
    }

    function title(){
        return  `${location.pathname.slice(1,2).toUpperCase()}${location.pathname.substring(2)}`
    }


    return (
        <div>
            <h1>{title()}</h1>

            <form onSubmit={logIn}>
                <input type="text"  value={login} onChange={handleLogin}></input>
                <input type="password" value={password} onChange={handlePassword}></input>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AuthForm;
