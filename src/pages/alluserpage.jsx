import userService from '../services/user'
import { useState, useEffect,useRef } from 'react'
import { ListGroup, Form } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'


const AllUserPage = () => {
    const [allUser,setAllUser] =useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async() => {
            const getAllUser = await userService.getAllUserAxios()
            setAllUser(getAllUser)
        }
        fetchData()
    },[])

    return (
        <ListGroup as='ul'>
            {allUser.map(oneUser => {
                return (

                    <ListGroup.Item key={oneUser._id}>
                        <a onClick={() => navigate(`/user-info/${oneUser._id}`)}>
                            <Form.Label>Name:{oneUser.name}</Form.Label>
                        </a>
                        <p>Username:{oneUser.username}</p>
                        <p>Follower:{oneUser.follower.length}</p>
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}
export default AllUserPage