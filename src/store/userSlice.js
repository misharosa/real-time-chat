import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",

    initialState: {
        users: JSON.parse(localStorage.getItem('users')) || [],
        messages: JSON.parse(localStorage.getItem('messages')) || [],
    },

    reducers: {
        addUser ( state, action ) {
            sessionStorage.setItem('user-session', JSON.stringify({ name: action.payload }))
            state.users.push({ name: action.payload, id: new Date().toISOString(), userId: state.users.length + 1 })
            localStorage.setItem('users', JSON.stringify(state.users))
        },
        addMessage (state, action) {
            if (!state.messages) {
                state.messages = []
            }

            state.messages.push({ name: action.payload.name, message: action.payload.message, id: state.messages.length + 1 })
            localStorage.setItem('messages', JSON.stringify(state.messages))
        },
        refreshMessage (state,action) {
            state.messages = action.payload
        }
    }
})

export default usersSlice.reducer
export const { addUser, addMessage, refreshMessage } = usersSlice.actions
