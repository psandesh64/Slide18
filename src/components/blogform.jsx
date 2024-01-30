import { useState } from "react";

const BlogForm = ({createBlog}) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url:'',
        likes: 0
    })
    const addBlog = (event) =>{
        event.preventDefault()
        createBlog({
            title: newBlog.title,
            author: newBlog.author,
            url:newBlog.url,
            likes: newBlog.likes
        })
        setNewBlog({
            title: '',
            author: '',
            url:'',
            likes: 0
        })
    }
    
    
    return(
        <form onSubmit={addBlog}>
        <label>Title : </label>
        <input type='text' name='title' value={newBlog.title} 
        onChange={(event) => setNewBlog({...newBlog,title:event.target.value})}/>
        <label>Author : </label>
        <input type='text' name='author' value={newBlog.author}
        onChange={(event) => setNewBlog({...newBlog,author:event.target.value})}/>
        <label>Likes : </label>
        <input type='number' name='likes' value={newBlog.likes}
        onChange={(event) => setNewBlog({...newBlog,likes:event.target.value})}/>

        <button type='submit'>Save</button>
        </form>
    )
}
export default BlogForm