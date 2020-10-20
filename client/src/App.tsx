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
    </App>
  );
}

export default App;
