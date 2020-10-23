import React, { useState } from 'react';
import styled from 'styled-components'
import { ContactListComponent } from './ContactList'
import { MessagesComponent } from './Messages'
import { Socket } from '../Socket'

function ContentComponent({socket}: {socket: Socket | null}) {
   let [notifications, setNotifications] = useState<string[]>([])
   return (
      <Content>
         <ContactListComponent notifications = {notifications} setNotifications= {setNotifications} />
         <MessagesComponent
            socket={socket}
            notifications = {notifications}
            setNotifications = {setNotifications}
         />
      </Content>
   )
}

export { ContentComponent }

let Content = styled.div`
   display: flex;
   flex: 1 0 0;
   height: calc(100vh - 70px);
   margin: 0 5%;
   background-color: rgba(0,0,0,0.05);
`
