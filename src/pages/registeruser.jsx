import { useState } from 'react'
import { Form,Button } from 'react-bootstrap'
const RegisterUser = ({ createUser }) => {
    const [name,setName]=useState('')
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const handleSubmit = (event) => {
        event.preventDefault()
        createUser({
            name,
            username,
            password
        })
        setName('')
        setUsername('')
        setPassword('')
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name : </Form.Label>
                    <Form.Control type='text' name='name' value={name}
                        onChange={(event) => setName(event.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username : </Form.Label>
                    <Form.Control type='text' name='username' value={username}
                        onChange={(event) => setUsername(event.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password : </Form.Label>
                    <Form.Control type='password' name='password' value={password}
                        onChange={(event) => setPassword(event.target.value)}/>
                </Form.Group>

                <Button className='m-2' variant='primary' type='submit'>Save</Button>
            </Form>
        </div>
    )
}
export default RegisterUser