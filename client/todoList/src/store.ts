import { configureStore } from "@reduxjs/toolkit"
import notificationSlice from "./features/notification/notificationSlice"
import todoSlice from "./features/todos/todosSlice"
export const store = configureStore({
    reducer:{
        todoSlice:todoSlice,
        notificationSlice:notificationSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;
export default store;
