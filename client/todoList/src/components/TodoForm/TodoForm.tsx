import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import TodoList from "../TodoList/TodoList";
import { useDispatch } from "react-redux";
import { createTask } from "../../features/todos/todosSlice";
import { getTodos, } from "../../features/todos/todosApi";

const TodoForm = () => {

    const [newTodo,setNewTodo] = useState("")
    const [id, setId] = useState(10)
    const dispatch  = useDispatch()
    const navigate = useNavigate()

  useEffect(()=>{
     getTodos(dispatch)
  },[])


    function toggleTheme() {
    const isDark = document.body.dataset.theme === "dark";
  if (isDark) {
    document.body.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  } else {
    document.body.dataset.theme = "dark";
    localStorage.setItem("theme", "dark");
  }
}

  function handleInput(e:ChangeEvent<HTMLInputElement>){
      setNewTodo(e.target.value)
    }


    function handleAddTodo(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
         if(newTodo.length !== 0){
          console.log(id , newTodo);
          dispatch((createTask({id:id,name:newTodo})))
          setNewTodo('')
          setId(prev=>prev+1)

         }
    }

    function logOut(){
        localStorage.removeItem("userId")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <header className="bg-white dark:bg-gray-800 shadow-md">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">

      <nav className="flex gap-4">
        <button className="px-3 py-1 rounded    hover:bg-gray-200 dark:hover:bg-gray-700">Все</button>
        <button className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Активные</button>
        <button className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Выполненные</button>
      </nav>
      <div className="flex gap-4 items-center">
        <button
          className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={toggleTheme}
        >
          Смена темы
        </button>
        <button onClick={()=>logOut()} className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded">
          Выход
        </button>
      </div>
    </div>
  </header>


  <main className="container mx-auto px-4 py-6">
    <h1 className="text-3xl font-bold mb-4">Список задач</h1>
      <form
    onSubmit={handleAddTodo}
    className="flex gap-2 mb-4"
  >
    <input
      type="text"
      placeholder="Введите задачу..."
      value={newTodo}
      onChange={handleInput}
      className="flex-grow px-3 py-2 rounded border border-gray-300 dark:border-gray-700
                 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
    >
      Добавить
    </button>
  </form>


    <div className="">
      <TodoList/>
    </div>


  </main>
</div>

    );

};

export default TodoForm;
