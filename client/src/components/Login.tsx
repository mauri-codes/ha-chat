import React, { useState, useContext } from 'react';
import styled from 'styled-components'
import { usersContext } from '../context/userContext'


function LoginComponent() {
   let [userInput, setUserInput] = useState("")
   let handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setUserInput(event.currentTarget.value)
   let userContext = useContext(usersContext)
   let signIn = () => {
      if (userInput) {
         sessionStorage.setItem("user", userInput)
         userContext?.setUser(userInput)
      }
   }
   let onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
         signIn()
       }
   }
   return (
      <Container>
         <LoginBox>
            <Title>Login</Title>
            <div>{userContext?.user}</div>
            <Form>
               username:&nbsp;&nbsp; <input value={userInput} onChange={handleInputChange} type="text"  onKeyDown={onEnter} />
            </Form>
            <ButtonContainer>
               <Button onClick={signIn}>Sign In</Button>
            </ButtonContainer>
         </LoginBox>
      </Container>
   )
}

export { LoginComponent }

let Container = styled.div`
   position: absolute;
   display:flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 100%;
   background-color: rgba(0,0,0, 0.5);
`
let LoginBox = styled.div`
   display: flex;
   flex-direction: column;
   width: 50%;
   height: 30%;
   background-color: gainsboro;
   padding: 30px;
`
let Title = styled.div`
   flex: 1 0 0;
   font-size: 25px;
   font-weight: bold;
`
let Form = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex: 3 0 0;
   font-size: 20px;
   input {
      height: 22px;
   }
`
let ButtonContainer = styled.div`
   display: flex;
   flex: 1 0 0;
   flex-direction: row-reverse;
   align-items: center;
`
let Button = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   border:  1px solid black;
   height: 28px;
   width: 100px;
   padding: 5px;
   background-color: palegreen;
   cursor: pointer;
   &:hover{
      background-color: lightgreen;
   }
`
