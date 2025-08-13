
import { deleteTodo, toggleTodo } from "../../features/todos/todosSlice";
import CheckBox from "../../shared/checkBox/checkBox";
import DeleteTodo from "../../shared/deleteTodo/deleteTodo";
import { useDispatch } from "react-redux";

interface TodoItem {
    id:number,
    name:string,
    completed : boolean
}
const TodoItem = ({id,name,completed}:TodoItem) => {

const dispatch = useDispatch();
  const toogle = () => dispatch(toggleTodo(id));
  const deleteTask  = () => dispatch(deleteTodo(id));
    return (
        <div className="container mx-auto px-4 py-3  flex items-center gap-3 bg-white dark:bg-gray-800 rounded shadow ">
            <CheckBox checked={completed} onChange={()=>toogle()} />
            <span className=" flex-grow text-lg" >{name}</span>
        <DeleteTodo onClick={()=>deleteTask()}/>
        </div>
    );
};

export default TodoItem;
