import './App.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, refreshMessage } from "./store/userSlice";
import ChatList from "./components/ChatList";

export const App = () => {
    const [userName, setUserName] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)
    const [chatIsOpen, setChatOpen] = useState(false)

    const dispatch = useDispatch()
    const { users } = useSelector(state => state.users)

    useEffect(() => {
        try {
                const helper = () => {
                    const localMessages = JSON.parse(localStorage.getItem('messages'))
                    if (localMessages !== null) {
                    dispatch(refreshMessage(localMessages))
                    }
                }

                   window.addEventListener("storage", helper);

                return () => {
                    window.removeEventListener("storage", helper);
                };
        } catch (e) {
            console.error(e.message)
        }
    },[]);

     useEffect(() => {
         try {
             dispatch(refreshMessage(JSON.parse(localStorage.getItem('messages'))))

             const localUsers = JSON.parse(localStorage.getItem('users'))
             const sessionUser = JSON.parse(sessionStorage.getItem('user-session'))

             if (sessionUser.name) {
                 const logIn = localUsers.some(item => item.name === sessionUser.name)

                 if (logIn) {
                     setChatOpen(true)
                 }
             }
         } catch (e) {
             console.error(e.message)
         }
     },[])

    const addChar = (e) => {
        e.preventDefault()

        try {
            const existUser = users.length > 0 && users.some(user => user.name === userName)

            if (!existUser) {
                dispatch(addUser(userName))
                setUserName('')
                setChatOpen(true)
                setErrorMessage(false)
            } else {
                setErrorMessage(true)
            }
        } catch (e) {
            console.error(e.message)
        }
    }

  return (
    <div className="App">
        <div className="chat-container">
            { !chatIsOpen &&
                <label htmlFor="add-user">
                    <input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        name="add-user"
                        type="text"
                    />
                    <button onClick={(e) => {
                    userName.length > 0 && addChar(e)
                    }}
                    >
                        Let's chat
                    </button>
                </label>
            }

            { errorMessage &&
                <p style={{color:"red", fontSize: "10px", margin: 0}}>{'user with this name already exists'}</p>
            }
            {
            chatIsOpen &&
            <ChatList />
            }
        </div>
    </div>
  );
}
