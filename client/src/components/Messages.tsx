import React, { useState, useContext } from 'react';
import { Socket } from '../Socket'
import styled from 'styled-components'
import { MessageBoxComponent } from './MessageBox'
import { usersContext } from '../context/userContext'

function MessagesComponent({socket}: {socket: Socket | null}) {
   let [userInput, setUserInput] = useState("")
   let [messages, setMessages] = useState<any>({"no-user": []})
   let handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setUserInput(event.currentTarget.value)
   let userContext = useContext(usersContext)
   let chatUser = userContext?.chatUser
   let chatUserName = "no-user"
   let chatUserId = "no-user"
   if (chatUser) {
      chatUserName = chatUser?.split("..")[0]
      chatUserId = chatUser?.split("..")[1]
   }
   let sendMessage = () => {
      if (userInput != "") {
         socket?.emitMessage(chatUserId, userInput)
         pushMessage(chatUserName || "", userInput)
      }
   }
   let pushMessage = (user: string, text: string) => {
      if (!messages[user]) {
         messages[user] = []
      }
      let new_messages = {...messages}
      new_messages[user] = [...messages[user], {recipient: user, message: text}]
      setMessages(new_messages)
   }
   socket?.receiveMessage(pushMessage)
   return (
      <MessageSection>
         <MessageBoxComponent messages={chatUser ? (messages[chatUserName] ? messages[chatUserName]: []) : []} />
         <EditSection>
            <TextBox>
               {
                  chatUser && <textarea  value={userInput} onChange={handleInputChange}></textarea>
               }
            </TextBox>
            {
               chatUser &&
               <ButtonSection onClick={sendMessage} >
                  SEND
               </ButtonSection>
            }
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
