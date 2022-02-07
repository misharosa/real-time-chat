import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"

const rootReducer = combineReducers({
    users: userReducer
})

export const store = configureStore({
    reducer: rootReducer,
})