import React from 'react';
import styled from 'styled-components'
import { ContactListComponent } from './ContactList'

function ContentComponent() {
   return (
      <Content>
         <ContactListComponent />
         <Messages>Messages</Messages>
      </Content>
   )
}

export { ContentComponent }

let Messages = styled.div`
   display: flex;
   flex: 3 0 600px;
 `
let Content = styled.div`
   display: flex;
   flex: 1 0 0;
   max-height: calc(100% - 70px);
   background-color: lightblue;
   margin: 0 5%;
`
