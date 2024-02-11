import { useState, useEffect,useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import userService from '../services/user'

const UserPage = ({ user }) => {
    const [userInfo,setUserInfo] = useState({
        id:'',
        username:'' })
    const id = useParams().id
    const userCheckRef = useRef(false)
    const followerCheckRef = useRef(false)

    useEffect(() => {
        if (user) {
            window.localStorage.setItem('loggedUser',JSON.stringify(user))
        }
    },[user])

    useEffect(() => {
        const fetchData = async() => {
            const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
            userService.setToken(loggedUser.token)
            const getUser = await userService.getUserAxios(id)
            setUserInfo(getUser)
            userCheckRef.current = (loggedUser.id === id)
            followerCheckRef.current = getUser.follower.includes(loggedUser.id)
        }
        fetchData()
    },[id])

    const followEvent = async(uid) => {
        const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
        const followUser = await userService.followAxios(uid)
        setUserInfo(followUser)
        followerCheckRef.current = followUser.follower.includes(loggedUser.id)
    }

    return (
        <div>
            <p>Name: {userInfo.name}</p>
            <p>Username: {userInfo.username}</p>
            <p>Followed By: {userInfo.follower ? userInfo.follower.length : 0}</p>
            <p>Follows: {userInfo.follows ? userInfo.follows.length : 0}</p>
            {(userCheckRef.current) ? null : <button onClick={() => followEvent(userInfo._id)}>
                {followerCheckRef.current ? 'Unfollow': 'follow'}</button>}
        </div>
    )
}
export default UserPage