import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import Login from './views/Login/Login'
import Feed from './views/Feed/Feed'
import HomePage from './views/HomePage/HomePage'
import Register from './views/Register/Register'
import MyAccount from './views/MyAccount/MyAccount'
import { Navigate } from 'react-router-dom'
import Profile from './views/Profile/Profile'
import PlayerView from './views/PlayerView/PlayerView'
import LoadingScreen from './views/LoadingScreen/LoadingScreen'
import Checkout from './views/Checkout/Checkout'
import Modal from './components/Cart/Modal/Modal'
import BeatView from './views/BeatView/BeatView'
import BrowseView from './views/BrowseView/Browse'

function App() {
  return (
    <div className="App">
      <PlayerView />
      <Navbar />
      <Modal />
      <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register/>} />
          <Route path="profile/:username/:component" element={<Profile />} />
          {/* AUTH */}
          <Route path="/validation" element={<LoadingScreen />} />
          <Route path="/activate/:token" element={<LoadingScreen />} />

          <Route path="feed" element={
                <Feed />
          } />

          <Route path="account/:component" element={
            <ProtectedRoute>
                <MyAccount />
            </ProtectedRoute>
          } />

          <Route path="/checkout" element={ 
            <ProtectedRoute>
                <Checkout />
            </ProtectedRoute>
          } />

          <Route path="/beats/:id" element={
            <ProtectedRoute>
              <BeatView/>
            </ProtectedRoute>
          }/>

          <Route path="/browse" element={
            <BrowseView />
          }/>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </div>
  )
}

export default App
