import TodoItem from "../TodoItem/TodoItem";
import { useSelector } from "react-redux";
import type  { RootState } from "../../store";
import { Spinner } from "../../shared/spinner/spinner";
const TodoList = ({activeTab}:{activeTab:string}) => {

const { list: todos, } = useSelector((state: RootState) => state.todoSlice);
const {isLoading} = useSelector((state:RootState)=>state.authSlice)
const filteredTodos = todos.filter((item)=>{
        if(activeTab === 'active') return !item.completed;
        if(activeTab === "completed") return item.completed
        return true
    })

const renderITems = ()=>{
     if (isLoading) {
        return <Spinner />;
    }

    if (todos.length === 0) {
        return <p className="text-gray-500 text-2xl ">Нет задач</p>;
    }

    return filteredTodos.map((item) => (
        <TodoItem
            key={item.id}
            id={item.id}
            name={item.title}
            completed={item.completed}
        />
    ));
    }

    return(
        <div  className="flex flex-col items-center gap-2 w-full ">
            {renderITems()}
    </div>
    )
};

export default TodoList;
