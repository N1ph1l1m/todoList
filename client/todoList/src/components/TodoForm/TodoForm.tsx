import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import TodoList from "../TodoList/TodoList";
import { useDispatch , useSelector} from "react-redux";
import { type  RootState } from "../../store";
import { createTodo, getTodos } from "../../features/todos/todosApi";
import SwitchTheme from "../../shared/switchTheme/switchTheme";
import { resetNotification } from "../../features/notification/notificationSlice";
import { startLoading } from "../../features/todos/todosSlice";

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState("");
  const [activeTab,setActiveTab] = useState("all")
  const userId: string | null = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {status,textMessage}  = useSelector((state:RootState)=>state.notificationSlice)

  useEffect(() => {
    dispatch(startLoading())
    dispatch(resetNotification())
    getTodos(dispatch);
  }, []);



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

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setNewTodo(e.target.value);
  }

  async function handleAddTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newTodo.length !== 0 && userId) {
      await createTodo(userId, newTodo, dispatch);
      setNewTodo("");
    }
  }

  function logOut() {
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(resetNotification())
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
     <nav className="flex gap-4">
  <button
    onClick={() => setActiveTab("all")}
    className={`px-3 py-1 rounded
      hover:bg-gray-200 dark:hover:bg-gray-700
      ${activeTab === "all" ? " bg-blue-500 hover:bg-blue-600 text-white rounded hover:text-black dark:hover:text-white" : ""}`}
  >
    Все
  </button>

  <button
    onClick={() => setActiveTab("active")}
    className={`px-3 py-1 rounded
      hover:bg-gray-200 dark:hover:bg-gray-700
      ${activeTab === "active" ? "   bg-blue-500 hover:bg-blue-600 text-white rounded hover:text-black dark:hover:text-white " : ""}`}
  >
    Активные
  </button>

  <button
    onClick={() => setActiveTab("completed")}
    className={`px-3 py-1 rounded
      hover:bg-gray-200 dark:hover:bg-gray-700
      ${activeTab === "completed" ? " bg-blue-500 hover:bg-blue-600 text-white rounded hover:text-black dark:hover:text-white" : ""}`}
  >
    Выполненные
  </button>
</nav>
          <div className="flex gap-4 items-center">
            <SwitchTheme onChange={toggleTheme} />
            <button
              onClick={() => logOut()}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Выход
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4">Список задач</h1>
            <span className={` ${status === "off" ? "hidden":" block" } ${status === "error" ?  "text-red-600 ":"text-green-600"} block text-center text-xl font-bold mb-4 `} >{textMessage}</span>
        <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
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
          <TodoList activeTab={activeTab} />
        </div>
      </main>
    </div>
  );
};

export default TodoForm;
