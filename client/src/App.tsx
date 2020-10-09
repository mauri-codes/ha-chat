import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

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
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
