import Login from './components/login/login'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';

function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />
  }
  
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
