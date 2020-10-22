import React from 'react';
import styled from 'styled-components'
import { ContactListComponent } from './ContactList'

function ContentComponent() {
   return (
      <Content>
         <ContactListComponent />
         <MessagesComponent></MessagesComponent>
      </Content>
   )
}

export { ContentComponent }

let MessageSection = styled.div`
   display: flex;
   flex-direction: column;
   height: 100%;
   flex: 3 0 600px;
`
let Messages = styled.div`
   flex: 1 0 0;
`
let TextBox = styled.div`
   display: flex;
   flex: 5 0 0;
   align-items: center;
   justify-content: center;
   background-color: rgba(0,0,0,0.1);
   textarea {
      width: 90%;
      height: 30px;
      resize: none;
   }
`
let ButtonSection = styled.div`
   display: flex;
   flex: 1 0 0;
   align-items: center;
   justify-content: center;
   font-size: 20px;
   font-weight: bold;
   cursor: pointer;
   background-color: lightsteelblue;
   &:hover {
      background-color: rgb(174, 214, 241);
   }
`
let EditSection = styled.div`
   display: flex;
   flex: 0 0 70px;
`
let Content = styled.div`
   display: flex;
   flex: 1 0 0;
   height: calc(100vh - 70px);
   margin: 0 5%;
   background-color: rgba(0,0,0,0.05);
`

function MessagesComponent() {
   return (
      <MessageSection>
         <Messages></Messages>
         <EditSection>
            <TextBox>
               <textarea></textarea>
            </TextBox>
            <ButtonSection>
               SEND
            </ButtonSection>
         </EditSection>
      </MessageSection>
   )
}
