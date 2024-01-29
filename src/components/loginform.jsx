const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
        <div>
            <form onSubmit={handleLogin}>
            <label>Username: </label>
            <input type='text' value={username} name='username'
            onChange={handleUsernameChange}/>
            <label>Password: </label>
            <input type='password' value={password} name='password'
            onChange={handlePasswordChange}/>
            <button type='submit'>Login</button>
            </form>
        </div>
    )
  }

  export default LoginForm