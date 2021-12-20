import React, { useState } from 'react'
import { validateUser } from '../../data/users'

import { useDispatch } from 'react-redux'
import { login } from '../../store/usersSlice'
import { useNavigate } from 'react-router-dom'

import classes from './Login.module.css'

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError(false)
    const user = validateUser(email, password)
    if (user) {
      dispatch(login(user))
      navigate(-1)
    } else {
      setError(true)
    }
  }

  return (
    <main>
      <h2>Log in</h2>
      <form name="login-form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="user@example.com"
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {error && <p className={classes.error}>Invalid user credentials</p>}
        <button data-testid="login-btn">Log in</button>
      </form>
    </main>
  )
}

export default Login
