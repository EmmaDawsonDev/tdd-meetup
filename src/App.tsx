import { Routes, Route } from 'react-router-dom'
import { RootState } from './store/store'
import { useSelector } from 'react-redux'

import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import MeetupDetail from './pages/MeetupDetail/MeetupDetail'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import AddMeetup from './pages/AddMeetup/AddMeetup'

import './App.css'

function App() {
  const user = useSelector((state: RootState) => state.user.user)
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/meetups/:id" element={<MeetupDetail />} />
        {user && <Route path="/profile" element={<Profile />} />}
        <Route path="/add-meetup" element={<AddMeetup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
