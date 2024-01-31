import { useState,forwardRef,useImperativeHandle } from "react";

const BlogToggleable = ({blog}) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display : visible ? 'none' : ''}
    const showhenVisible = { display : visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    console.log(blog)
   
    return (
        <div>
            <span>Title: {blog.title}</span>
            <button style={hideWhenVisible}onClick={toggleVisibility}>Show</button>
            <button style={showhenVisible} onClick={toggleVisibility}>Hide</button>
            <div style={showhenVisible}>
            <span>Author: {blog.author}</span><br/>
            <span>Likes: {blog.likes}</span><br/>
            <span>User: {blog.user.name}</span><br/>
            </div>
        </div>
    )
}

export default BlogToggleable