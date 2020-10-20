import React from 'react';
import styled from 'styled-components'
import './App.css';
import io from 'socket.io-client';
import { ContentComponent } from './components/Content'

function App() {
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
   let Header = styled.header`
      display: flex;
      flex: 0 0 70px;
      background-color: lightcoral;
   `
   let App = styled.div`
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
   `
   return (
      <App>
         <Header />
         <ContentComponent />
         <LoginComponent />
      </App>
   );
}

export default App;


function LoginComponent() {
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
   return (
      <Container>
         <LoginBox>
         <Title>Login</Title>
         <Form>
            username:&nbsp;&nbsp; <input type="text"/>
         </Form>
         <ButtonContainer>
            <Button>Sign In</Button>
         </ButtonContainer>
         </LoginBox>
      </Container>
   )
}
