import React, { useState } from 'react';
import styled from 'styled-components'

function MessagesComponent() {
   let [userInput, setUserInput] = useState("")
   let handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setUserInput(event.currentTarget.value)
   return (
      <MessageSection>
         <Messages></Messages>
         <EditSection>
            <TextBox>
               <textarea  value={userInput} onChange={handleInputChange}></textarea>
            </TextBox>
            <ButtonSection>
               SEND
            </ButtonSection>
         </EditSection>
      </MessageSection>
   )
 }

export { MessagesComponent }

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
