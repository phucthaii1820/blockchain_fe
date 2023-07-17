import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Home from 'pages/Home'
import userStore from 'stores/user'
import Login from 'pages/Login'
import Register from 'pages/Register'
import Profile from 'pages/Profile'
import Transaction from 'pages/Transaction'
import PendingTransaction from 'pages/PendingTransaction'

export default function WebRoute() {
  const { user } = userStore()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : <Login />} />
        <Route path="/transaction" element={user ? <Transaction /> : <Login />} />
        <Route path="/pending-transaction" element={user ? <PendingTransaction /> : <Login />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}
