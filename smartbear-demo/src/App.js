import Login from './components/login/LoginSmart'
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/shared/Header'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useState, Fragment } from 'react';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  return tokenString
}

function App() {
  const token = getToken();
  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div>
      <Header></Header>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
