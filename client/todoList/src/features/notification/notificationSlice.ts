import { createSlice,  type PayloadAction } from "@reduxjs/toolkit";

type typeMessage = "off" | "error" | "success";


interface INotification{
    status:typeMessage,
    textMessage:string,
}

const initialState:INotification={
    status:"off",
    textMessage:"",
}

const notificationSlice  = createSlice({
    name:"notification",
    initialState,
    reducers:{
        resetNotification(state){
            state.status = "off"
            state.textMessage = ""
        },
        createSuccess(state,action:PayloadAction<string>){
            state.status = "success"
            state.textMessage = action.payload
        },
        createError(state,action:PayloadAction<string>){
            state.status = "error"
            state.textMessage = action.payload
        }

    }
})
export const {createSuccess,createError,resetNotification} = notificationSlice.actions
export default notificationSlice.reducer
