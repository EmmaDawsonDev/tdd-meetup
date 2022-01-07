import { Routes, Route } from 'react-router-dom'
import { RootState } from './store/store'
import { useSelector } from 'react-redux'

import Header from './components/Header/Header'

import './App.css'
import Home from './pages/Home/Home'
import MeetupDetail from './pages/MeetupDetail/MeetupDetail'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import AddMeetup from './pages/AddMeetup/AddMeetup'

function App() {
  const user = useSelector((state: RootState) => state.user.user)
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/meetups/:id" element={<MeetupDetail />} />
        {user && <Route path="/profile" element={<Profile />} />}
        {user && <Route path="/add-meetup" element={<AddMeetup />} />}
      </Routes>
    </>
  )
}

export default App
