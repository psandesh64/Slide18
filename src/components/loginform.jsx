import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
        <Form onSubmit={handleLogin}>
            <Form.Group className='mb-3'>
                <Form.Label>Username: </Form.Label>
                <Form.Control type='text' value={username} name='username'
                    onChange={handleUsernameChange}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Password: </Form.Label>
                <Form.Control type='password' value={password} name='password'
                    onChange={handlePasswordChange}/>
            </Form.Group>
            <Button variant='primary' type='submit'>Login</Button>
        </Form>
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