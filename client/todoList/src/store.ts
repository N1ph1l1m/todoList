import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer:{
        // transactionsSlice:transactionsSlice,
        // modalTransactionSlice:modalTransactionSlice,
        // usersSlice:usersSlice,
        // notificationSlice:notificationSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;
export default store;
