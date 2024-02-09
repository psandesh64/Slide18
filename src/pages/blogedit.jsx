import '../App.css'
import blogService from '../services/blog'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const BlogEdit = ({ setBlogObj, deleteBlog }) => {
    const [blog,setBlog] = useState({
        title:'',
        content:''
    })
    const navigate = useNavigate()
    const id = useParams().id

    useEffect(() => {
        const fetchData = async () => {
            const newblog = await blogService.getBlog(id)
            setBlog(newblog)
        }
        fetchData()
    }, [id])

    const handleBlogEdit = async (event) => {
        event.preventDefault()
        try{
            const blogCreated = await blogService.updateBlog( id,blog )
            const blogsGet = await blogService.getBlogs()
            setBlogObj(blogsGet)
            navigate('/index')
        } catch (exception) {
            console.log(exception)
        }
    }

    return (
        <>
            <button onClick={() => deleteBlog(blog._id) }>Delete</button>
            <form onSubmit={handleBlogEdit}>
                <div className='card'>
                    <div style={{ display:'flex', justifyContent:'space-between' }}>
                        <input type='text' name='title' placeholder={blog.title}
                            onChange={(event) => setBlog({ ...blog,title:event.target.value })}/>
                    </div>
                    <div className='imagebox'>{blog.image && (
                        <img src={`http://localhost:3001/${blog.image}`} alt={`Image for ${blog.title}`} />
                    )}
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between' }}>
                        <div style={{ display:'flex' }}>
                            <div>{blog.likes !== undefined ? blog.likes.length : 0} users like this</div>
                        </div>
                    </div>
                    <div>
                        <textarea type='textarea' name='content' placeholder={blog.content}
                            onChange={(event) => setBlog({ ...blog,content:event.target.value })}>
                        </textarea>
                    </div>
                    <div><button type='submit'>Save Changes</button></div>
                </div>
            </form>
        </>
    )
}
export default BlogEdit