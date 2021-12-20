import React from 'react'

const Login = () => {
  return (
    <main>
      <h2>Log in</h2>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="user@example.com" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button data-testid="login-btn">Log in</button>
      </form>
    </main>
  )
}

export default Login
