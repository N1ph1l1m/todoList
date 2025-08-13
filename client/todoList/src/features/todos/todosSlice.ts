import { createSlice } from "@reduxjs/toolkit";

interface IList{
  id:number,
  title:string,
  completed:boolean,
  userId?:number,
}
const todoSlice = createSlice({
  name: "list",
  initialState: {
    list: [] as IList[],
  },
  reducers: {
    createTask(state, action) {
      const { id, title } = action.payload;
      state.list.push({ id, title,completed: false,});
    },
   getServerData(state, action) {
  if (Array.isArray(action.payload)) {
    state.list = action.payload;
  } else {
    state.list.push(action.payload);
  }
},
    toggleTodo(state, action) {
        console.log(action);
      state.list = state.list.map((list) =>
        list.id === action.payload
          ? { ...list, completed: !list.completed }
          : list
      );
    },
    clearCompleted(state) {
      state.list = state.list.filter((items) =>  !items.completed);
    },
    deleteTodo(state,action){
      state.list = state.list.filter(list => list.id !== action.payload);
    }
  },
});
export const { createTask, toggleTodo, clearCompleted , deleteTodo,getServerData} = todoSlice.actions;

export default todoSlice.reducer;
