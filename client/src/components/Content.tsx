import React from 'react';
import styled from 'styled-components'
import { ContactListComponent } from './ContactList'
import { MessagesComponent } from './Messages'
import { Socket } from '../Socket'

function ContentComponent({socket}: {socket: Socket | null}) {
   return (
      <Content>
         <ContactListComponent />
         <MessagesComponent socket={socket} ></MessagesComponent>
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
