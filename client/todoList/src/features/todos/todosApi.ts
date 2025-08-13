
import axiosInstance from "../intercaptor/interceptor";
import { getServerData } from "./todosSlice";


export async function getTodos( dispatch){
try{
    const response = await axiosInstance.get("/todos");
    if(response && response.status === 200){
        console.log(response.data);
        dispatch(getServerData(response.data))
    }

}catch(error){
    console.error(error)
}
}
