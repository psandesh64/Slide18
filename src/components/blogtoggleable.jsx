import { useState} from "react";

const BlogToggleable = ({blog,likeOption}) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display : visible ? 'none' : ''}
    const showhenVisible = { display : visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    console.log(blog.likes)
   
    return (
        <div>
            <span>Title: {blog.title}</span>
            <button style={hideWhenVisible}onClick={toggleVisibility}>Show</button>
            <button style={showhenVisible} onClick={toggleVisibility}>Hide</button>
            <div style={showhenVisible}>
            <span>Author: {blog.author}</span><br/>
            <span>Likes: {blog.likes !== undefined ? blog.likes.length : 0}</span><br/>
            <span>User: {blog.user.name}</span><br/>
            <button onClick={()=>likeOption(blog._id)}>Like</button>
            </div>
        </div>
    )
}

export default BlogToggleable