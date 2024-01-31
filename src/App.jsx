import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import loginService from './services/login'
import blogService from './services/blog'
import NotificationMsg from './components/notificationmsg'
import LoginForm from './components/loginform'
import Toggleable from './components/toggleable'
import BlogToggleable from './components/blogtoggleable'
import BlogForm from './components/blogform'

const App = () => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  
  const [blogs,setBlogs] =  useState([])
  const [notification,setNotification] = useState({status:'',css:''})

  const blogFormRef = useRef()
  
  useEffect(()=>{
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
      const fetchedBlogs = await blogService.getBlogs();
      const sortedBlogs=fetchedBlogs.sort((a, b) => b.likes.length - a.likes.length)
      setBlogs(sortedBlogs);
    };
  
    fetchData();
  }, []);
  

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const loggeduser = await loginService.login( {username,password} )

      window.localStorage.setItem('loggedUserObj',JSON.stringify(loggeduser))
      blogService.setToken(loggeduser.token)
      setUser(loggeduser)
      setUsername('')
      setPassword('')
      setNotification({status:'Login Successful', css:'success'})
      setTimeout(()=>setNotification(''),2000)
    } catch (exception) {
      console.log('login unSuccessfull')
      setNotification({status:'Incorrect Credentials', css:'error'})
      setTimeout(()=>setNotification(''),2000)
      console.error(exception)  
    }
  }
  const addNewBlog = async (newBlog) => {

    try{
      blogFormRef.current.toggleVisibility()
      const blogCreated = await blogService.createBlog( newBlog )
      const updatedBlogs = await blogService.getBlogs(); // Fetch the updated list of blogs
      setBlogs(updatedBlogs)
      // setBlogs((prevBlogs) => [...prevBlogs, blogCreated])
      setNotification({status:'Created Successfully',css:'success'})
      setTimeout(()=>setNotification(''),2000);
    
    } catch (exception) {
      console.log(exception)
      setNotification({status:'Problem creating new Blog', css:'error'})
      setTimeout(()=>setNotification(''),2000);
    }
  }
  const likeBlog = async (id) => {
    try {
      const blogLiked = await blogService.putBloglikes(id)
      console.log(blogLiked)
      const updatedBlogs = await blogService.getBlogs()
      setBlogs(updatedBlogs)
    } catch (exception) {
      console.log(exception)
    }
  }
  const deleteBlog = async (id) => {
    try{
      const confirmation = confirm("Are you sure you want to delete this?")
      if (confirmation) {
      const blogDeleted = await blogService.deleteBlog(id) 
      const updatedBlogs = await blogService.getBlogs()
      setBlogs(updatedBlogs)
      }
      else {alert("Operation Cancelled")}
    }catch (exception) {
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
  
  const blogForm  = () => {
    return (
    <Toggleable buttonLabel='New Blog' ref={blogFormRef}>
      <BlogForm createBlog={addNewBlog}/>
    </Toggleable>
    )
  }
  if (user === null) {
    return (
      <div>
        <NotificationMsg noti={notification}/>
        <h2>Log in to Application</h2>
        {loginForm()}
      </div>
    )
  }

return (
  <div>
    <div>
    <NotificationMsg noti={notification}/>
    <h2>Blogs</h2>
    <button onClick={()=> {window.localStorage.removeItem('loggedUserObj');setUser(null)}}>Logout</button>
    </div>
    <div>{blogForm()}</div>
    {blogs.map(blog => (
      <div key={blog._id}>
        <BlogToggleable blog={blog} likeOption = {likeBlog} deleteOption={deleteBlog} currentUser={user}/>
      </div>
    ))}
  </div>
)
}

export default App