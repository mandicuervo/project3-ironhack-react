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
import { Navigate } from 'react-router-dom'
import Profile from './views/Profile/Profile'
import PlayerView from './views/PlayerView/PlayerView'

function App() {
  return (
    <div className="App">
      <Navbar />
      <PlayerView />
      <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register/>} />
          <Route path="profile/:username" element={<Profile />} />

          <Route path="feed" element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
          } />

          <Route path="account/:component" element={
            <ProtectedRoute>
                <MyAccount />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>        
    </div>
  )
}

export default App
