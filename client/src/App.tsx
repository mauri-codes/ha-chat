import React, { useState } from 'react';
import styled from 'styled-components'
import './App.css';
import io from 'socket.io-client';
import { ContentComponent } from './components/Content'
import { LoginComponent } from './components/Login'
import { currentUser } from './context/currentUser'

function AppComponent() {
   let loggedUser = sessionStorage.getItem("user") || ""
   let [user, setUser] = useState(loggedUser)
   const socket = io("http://localhost");
   console.log(socket.connected)

   socket.on('connect', () => {
      socket.emit("register", "mauri" + Math.floor(Math.random()*100))
      socket.on("all_users", (data:any) => {
         console.log(data)
      })
   })
   socket.on('disconnect', () => {
      console.log(socket.connected)
   })
   let signOut = () => {
      sessionStorage.removeItem("user")
      setUser("")
   }
   return (
      <App>
         <currentUser.Provider value= {{user, setUser}}>
            <Header>
               {user &&
                  <Title>Hello {user}!</Title>
               } {!user &&
                  <Title>HA Chat</Title>
               }
               <SignOutButton onClick={signOut}>Sign Out</SignOutButton>
            </Header>
            <ContentComponent />
            {user === "" &&
               <LoginComponent />
            }
         </currentUser.Provider>
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
