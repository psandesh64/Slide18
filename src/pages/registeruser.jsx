import { useState } from 'react'

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
            <form onSubmit={handleSubmit}>
                <label>Name : </label>
                <input type='text' name='name' value={name}
                    onChange={(event) => setName(event.target.value)}/><br/>
                <label>Username : </label>
                <input type='text' name='username' value={username}
                    onChange={(event) => setUsername(event.target.value)}/><br/>
                <label>Password : </label>
                <input type='password' name='password' value={password}
                    onChange={(event) => setPassword(event.target.value)}/><br/>

                <button type='submit'>Save</button>
            </form>
        </div>
    )
}
export default RegisterUser