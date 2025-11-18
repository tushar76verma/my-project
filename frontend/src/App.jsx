import React, { useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

export default function App(){
  const [token, setToken] = useState(localStorage.getItem("token"));

  return token ? <Dashboard token={token} /> : <Login setToken={setToken} />;
}
