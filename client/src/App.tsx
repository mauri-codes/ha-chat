import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import './App.css';
import { ContentComponent } from './components/Content'
import { LoginComponent } from './components/Login'
import { usersContext, User } from './context/userContext'
import { Socket } from './Socket'

function AppComponent() {
   let loggedUser = sessionStorage.getItem("user") || ""
   let [user, setUser] = useState(loggedUser)
   let [socket, setSocket] = useState<Socket | null>(null)
   let [userList, setUserList] = useState<User[]>([])
   let [chatUser, setChatUser] = useState("")
   useEffect(() => {
      if (user) {
         let socket = new Socket(user, setUserList)
         setSocket(socket)
         return () => socket.disconnect()
      }
    }, [user]);
   
   let signOut = () => {
      sessionStorage.removeItem("user")
      setUser("")
   }
   return (
      <App>
         <usersContext.Provider value= {{user, setUser, userList, chatUser, setChatUser}}>
            <Header>
               {user &&
                  <Title>Hello {user}!</Title>
               } {!user &&
                  <Title>HA Chat</Title>
               }
               <SignOutButton onClick={signOut}>Sign Out</SignOutButton>
            </Header>
            <ContentComponent socket={socket} />
            {user === "" &&
               <LoginComponent />
            }
         </usersContext.Provider>
      </App>
   );
}

export default AppComponent;

let Header = styled.header`
   display: flex;
   flex: 0 0 70px;
   align-items: center;
   justify-content: space-between;
   background-color: lightsteelblue;
`
let Title = styled.div`
   padding-left: 6%;
   font-size: 25px;
   font-weight: bold;
`
let SignOutButton = styled.div`
   padding-right: 6%;
   font-weight: bold;
   cursor: pointer;
`
let App = styled.div`
   display: flex;
   flex-direction: column;
   height: 100%;
   width: 100%;
`
