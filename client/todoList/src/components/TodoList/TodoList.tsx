import TodoItem from "../TodoItem/TodoItem";
import { useSelector } from "react-redux";
import type  { RootState } from "../../store";
const TodoList = () => {

    const todos = useSelector((state:RootState)=>state.todoSlice.list)

    return(
    <div  className="flex flex-col items-center gap-2 w-full ">
        {todos.map((item)=>(<TodoItem key={item.id} id={item.id} name={item.title} completed={item.completed}/>))}
    </div>
    )
};

export default TodoList;
