import userService from '../services/user'
import { useState, useEffect,useRef } from 'react'
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
        <div>
            {allUser.map(oneUser => {
                return (

                    <div style={{ border:'1px solid red' }} key={oneUser._id}>
                        <a href="#" onClick={() => navigate(`/user-info/${oneUser._id}`)}>
                            <p>Name:{oneUser.name}</p>
                        </a>
                        <p>Username:{oneUser.username}</p>
                        <p>Follower:{oneUser.follower.length}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default AllUserPage