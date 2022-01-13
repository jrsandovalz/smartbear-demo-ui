import Login from './components/login/LoginSmart'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="container">
      <header className="App-header">
      </header>

    </div>
  );
}

export default App;
