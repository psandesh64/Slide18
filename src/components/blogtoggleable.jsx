import { useState } from 'react'

const BlogToggleable = ({ blog,likeOption,deleteOption,currentUser }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display : visible ? 'none' : '' }
    const showhenVisible = { display : visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    // console.log(blog.likes)
    console.log(blog.user.username,currentUser.username)

    return (
        <div>
            <span>Title: {blog.title}</span>
            <button style={hideWhenVisible}onClick={toggleVisibility}>Show</button>
            <button style={showhenVisible} onClick={toggleVisibility}>Hide</button>
            <div style={showhenVisible}>
                <span>Author: {blog.author}</span><br/>
                <span>Likes: {blog.likes !== undefined ? blog.likes.length : 0}</span><br/>
                <span>User: {blog.user.name}</span><br/>
                {blog.image && (
                    <img src={`http://localhost:3001/${blog.image}`} alt={`Image for ${blog.title}`} style={{ width: '90px' }} />
                )}
                <button onClick={() => likeOption(blog._id)}>Like</button>
                {blog.user.username === currentUser.username && <button onClick={() => deleteOption(blog._id)}>Delete</button>}
            </div>
        </div>
    )
}

export default BlogToggleable