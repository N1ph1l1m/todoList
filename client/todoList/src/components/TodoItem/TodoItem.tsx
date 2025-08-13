
import CheckBox from "../../shared/checkBox/checkBox";
import DeleteTodo from "../../shared/deleteTodo/deleteTodo";
import { useDispatch } from "react-redux";
import { completeTodo, deleteTodoItem } from "../../features/todos/todosApi";

interface TodoItem {
    id:number,
    name:string,
    completed : boolean
}
const TodoItem = ({id,name,completed}:TodoItem) => {

const dispatch = useDispatch();

async function toogle() {
    await completeTodo(id,dispatch)
}
async function deleteTodo() {
    await deleteTodoItem(id,dispatch)
}
    return (
        <div key={id} className="container mx-auto px-4 py-3  flex items-center gap-3 bg-white dark:bg-gray-800 rounded shadow ">
            <CheckBox checked={completed} onChange={()=>toogle()} />
            <span className=" flex-grow text-lg" >{name}</span>
        <DeleteTodo onClick={()=>deleteTodo()}/>
        </div>
    );
};

export default TodoItem;
