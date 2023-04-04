import './App.css'
import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import Login from './views/Login/Login'
import AuthContext from './contexts/AuthContext'
import { useEffect } from 'react'
import Feed from './views/Feed/Feed'
import HomePage from './views/HomePage/HomePage'
import Register from './views/Register/Register'
import MyAccount from './views/MyAccount/MyAccount'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register/>} />

          <Route path="feed" element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
          } />

          <Route path="account" element={
            <ProtectedRoute>
                <MyAccount />
            </ProtectedRoute>
          } />
        </Routes>
    </div>
  )
}

export default App
