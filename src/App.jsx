import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import loginService from './services/login'
import blogService from './services/blog'
import userService from './services/user'
import NotificationMsg from './components/notificationmsg'
import LoginForm from './components/loginform'
import Toggleable from './components/toggleable'
import BlogToggleable from './components/blogtoggleable'
import BlogForm from './components/blogform'
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import BlogHome from './pages/bloghomepage'
import BlogEdit from './pages/blogedit'
import UserPage from './pages/userpage'
import AllUserPage from './pages/alluserpage'
import { Nav, Navbar, Button } from 'react-bootstrap'

import Home from './pages/homepage'
import RegisterUser from './pages/registeruser'

const App = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [user,setUser] = useState(null)
    const [blogs,setBlogs] =  useState([])
    const [notification,setNotification] = useState({
        status:'',css:''
    })
    const navigate = useNavigate()
    // const [image, setImage] = useState({
    //     preview: '',
    //     raw: ''
    // })
    // const handlePhotoChange = (e) => {
    //     if (e.target.files.length) {
    //         setImage({
    //             preview: URL.createObjectURL(e.target.files[0]),
    //             raw: e.target.files[0],
    //         })
    //     }
    // }

    const blogFormRef = useRef()
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUserObj')
        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON)
            setUser(loggedUser)
            console.log(loggedUser.token)
            blogService.setToken(loggedUser.token)
        }
    },[])

    useEffect(() => {
        const fetchData = async () => {
            const fetchedBlogs = await blogService.getBlogs()
            const sortedBlogs=fetchedBlogs.sort((a, b) => b.likes.length - a.likes.length)
            setBlogs(sortedBlogs)
        }
        fetchData()
    }, [])
    const createUser = async (obj) => {
        try{
            const blogCreated = await userService.createUserAxios( obj )
            setNotification({ status:'User Registered Successfully',css:'success' })
            setTimeout(() => setNotification(''),2000)
        } catch (exception) {
            console.log(exception)
            setNotification({ status:'Problem creating new User', css:'danger' })
            setTimeout(() => setNotification(''),2000)
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const loggeduser = await loginService.login({ username,password } )

            window.localStorage.setItem('loggedUserObj',JSON.stringify(loggeduser))
            blogService.setToken(loggeduser.token)
            setUser(loggeduser)
            setUsername('')
            setPassword('')
            setNotification({ status:'Login Successful', css:'success'  })
            const updatedBlogs = await blogService.getBlogs() // Fetch the updated list of blogs
            setBlogs(updatedBlogs)
            navigate('/index')
            setTimeout(() => setNotification(''),2000)
        } catch (exception) {
            console.log('login unSuccessfull')
            setNotification({ status:'Incorrect Credentials', css:'danger' })
            setTimeout(() => setNotification(''),2000)
            console.error(exception)
        }
    }
    const addNewBlog = async (newBlog) => {

        try{
            blogFormRef.current.toggleVisibility()
            const blogCreated = await blogService.createBlog( newBlog )
            const updatedBlogs = await blogService.getBlogs() // Fetch the updated list of blogs
            setBlogs(updatedBlogs)
            // setBlogs((prevBlogs) => [...prevBlogs, blogCreated])
            setNotification({ status:'Created Successfully',css:'success' })
            setTimeout(() => setNotification(''),2000)
        } catch (exception) {
            console.log(exception)
            setNotification({ status:'Problem creating new Blog', css:'danger' })
            setTimeout(() => setNotification(''),2000)
        }
    }
    const setBlogObj = async (blogObj) => {
        try {
            setBlogs(blogObj)
        } catch (exception) {
            console.log(exception)
        }
    }
    const deleteBlog = async (id) => {
        try{
            const confirmation = confirm('Are you sure you want to delete this?')
            if (confirmation) {
                const blogDeleted = await blogService.deleteBlog(id)
                const updatedBlogs = await blogService.getBlogs()
                setBlogs(updatedBlogs)
                navigate('/index')
            }
            else {alert('Operation Cancelled')}
        } catch (exception) {
            console.log(exception)
        }
    }
    const loginForm = () => {
        return (
            <div>
                <Toggleable buttonLabel = 'login'>
                    <LoginForm
                        username = {username}
                        password = {password}
                        handleUsernameChange={(event) => setUsername(event.target.value)}
                        handlePasswordChange={(event) => setPassword(event.target.value)}
                        handleLogin={handleLogin}/>
                </Toggleable>
            </div>
        )
    }

    // const blogForm  = () => {
    //     return (
    //         <Toggleable buttonLabel='New Blog' ref={blogFormRef}>
    //             <BlogForm createBlog={addNewBlog} handlePhotoChange={handlePhotoChange} image={image}/>
    //         </Toggleable>
    //     )
    // }

    return (
        <div className='container'>
            <Navbar sticky='top' bg="dark" data-bs-theme="dark">
                <Navbar.Brand href="#">GatyU Blogs</Navbar.Brand>
                <Nav className='me-auto'>
                    { (!user) ?  (
                        <>
                            <Link className='nav-link' style={{ padding: 10 }} to='/'>Home</Link>
                            <Link className='nav-link' style={{ padding: 10 }} to='/register'>Register</Link>
                            <Link className='nav-link' style={{ padding: 10 }} to='/login'>Log In</Link>
                        </>
                    ):(
                        <>
                            <Link className='nav-link' style={{ padding: 10 }} onClick={ async() => {
                                const updatedBlogs = await blogService.getBlogs()
                                setBlogs(updatedBlogs)
                            }}to='/index'>Home</Link>
                            <Link className='nav-link' style={{ padding: 10 }} to='/all-user'>All Users</Link>
                            <Link className='nav-link' style={{ padding: 10 }}>{user.name} logged in</Link>
                            <Button variant='primary' onClick={() => {
                                window.localStorage.removeItem('loggedUserObj')
                                setUser(null)
                                navigate('/login')
                                setNotification({ status:'Logout Successful', css:'success' })
                                setTimeout(() => setNotification(''),2000)
                            }}>Logout</Button>
                        </>
                    )}
                </Nav>
            </Navbar>
            <NotificationMsg noti={notification}/>
            <div style={{ marginBottom:'50px' }}>
                <Routes>
                    <Route path='/' element={!user ? <Home/> : <Navigate replace to ='/index'/>}/>
                    <Route path='/register' element={!user ? <RegisterUser createUser={createUser}/>:<Navigate replace to ='/index'/>}/>
                    <Route path='/login' element={!user ? loginForm():<Navigate replace to ='/index'/>}/>
                    <Route path='/index' element={user ?
                        <BlogHome
                            blogs={blogs}
                            addnewBlog={addNewBlog}
                            blogFormRef={blogFormRef}
                            setBlogObj={setBlogObj}
                            user={user}/>
                        :<Navigate replace to ='/'/>}/>
                    <Route path='/blogedit/:id' element={<BlogEdit setBlogObj={setBlogObj} deleteBlog={deleteBlog}/>}/>
                    <Route path='/user-info/:id' element={<UserPage user={user}/>}/>
                    <Route path='/all-user' element={<AllUserPage/>}/>
                </Routes>
            </div>
            <Navbar className='container' fixed='bottom'>
                <span>Sandesh Pradhan&#169;2024</span>
            </Navbar>
        </div>
    )
}

export default App