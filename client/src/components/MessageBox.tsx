import React from 'react';
import styled from 'styled-components'

function MessageBoxComponent ({messages}: {messages: {recipient: string, message: string}[]}) {
   return (
      <Messages>
         {messages.map(message => (
            <Message key={`${message.recipient}-${Math.floor(Math.random() * 10000)}`}>
               <div><b>{message.recipient}: </b></div>
               <div>{message.message}</div>
            </Message>
         ))}
      </Messages>
   )
}

export { MessageBoxComponent }

let Messages = styled.div`
   display: flex;
   flex-direction: column-reverse;
   flex: 1 0 0;
   overflow: auto;
`
let Message = styled.div`
   display: flex;
   margin: 10px 20px;
   padding: 10px;
   background-color: rgba(224, 238, 144, 0.5);
   flex-direction: column;
`