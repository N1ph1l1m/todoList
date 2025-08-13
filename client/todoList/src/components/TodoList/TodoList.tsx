import TodoItem from "../TodoItem/TodoItem";
import { useSelector } from "react-redux";
import type  { RootState } from "../../store";
const TodoList = ({activeTab}:{activeTab:string}) => {

    const todos = useSelector((state:RootState)=>state.todoSlice.list)

    const filteredTodos = todos.filter((item)=>{
        if(activeTab === 'active') return !item.completed;
        if(activeTab === "completed") return item.completed
        return true
    })

    return(
        <div  className="flex flex-col items-center gap-2 w-full ">
            {filteredTodos.map((item)=>(
                <TodoItem
                    key={item.id}
                    id={item.id}
                    name={item.title}
                    completed={item.completed}
                />
            ))}
    </div>
    )
};

export default TodoList;
