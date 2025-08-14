import { configureStore } from "@reduxjs/toolkit"
import notificationSlice from "./features/notification/notificationSlice"
import todoSlice from "./features/todos/todosSlice"
import authSlice from "./features/auth/authSlice"
export const store = configureStore({
    reducer:{
        todoSlice:todoSlice,
        notificationSlice:notificationSlice,
        authSlice:authSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;
export default store;
