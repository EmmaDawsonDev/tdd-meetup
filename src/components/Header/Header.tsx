import React from 'react'
import { RootState } from '../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useMatch } from 'react-router-dom'
import { logout } from '../../store/usersSlice'

import classes from './Header.module.css'

const Header = () => {
  const user = useSelector((state: RootState) => state.user.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useMatch('login')

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className={classes.header}>
      <h1>MeetApp</h1>
      {!user && !match && <button onClick={() => navigate('/login')}>Login</button>}
      {user && (
        <div>
          <p>Welcome, {user.name}</p>
          <button onClick={handleLogout}>Log out</button>
        </div>
      )}
    </header>
  )
}

export default Header
