import PropTypes from 'prop-types'

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
LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm