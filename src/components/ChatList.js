import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../store/userSlice";
import "../App.css"
import { Button } from "@mui/material";

const ChatList = () => {
    const { messages } = useSelector(state => state.users)
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const sendMessage = (e) => {
        e.preventDefault()

        const sessionUser = JSON.parse(sessionStorage.getItem('user-session'))
        dispatch(addMessage({ message, name: sessionUser.name }))
        setMessage('');
    }

    return (
        <ul>
            {messages && messages.map((message, index) =>
                <li style={{ listStyle:"none", marginTop: '4px' }} key={index}>
                    <span>{`${message.name}: ${message.message}`}</span>
                </li>
            )}
            <label className="message" htmlFor="message">
                <input
                    placeholder={`${JSON.parse(sessionStorage.getItem('user-session')).name}...`}
                    className="message_input"
                    name="message" value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                />
                <Button
                    onClick={(e) => (message.length && sendMessage(e))}
                    sx={{borderRadius:'25px', width: "30px", height: "25px", color: "black"}}
                    variant="contained"
                >
                    Send
                </Button>
            </label>
        </ul>
    );
};

export default ChatList;
