import React from 'react'
import { RootState } from '../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useMatch } from 'react-router-dom'

import classes from './Header.module.css'

const Header = () => {
  const user = useSelector((state: RootState) => state.user.user)

  const navigate = useNavigate()
  const match = useMatch('login')

  return (
    <header className={classes.header}>
      <h1>MeetApp</h1>
      {!user && !match && <button onClick={() => navigate('/login')}>Login</button>}
    </header>
  )
}

export default Header
