import BlogForm from '../components/blogform'
import BlogShow from '../components/blogshow'
import Toggleable from '../components/toggleable'
import { useState, useRef } from 'react'
import blogService from '../services/blog'

const BlogHome = ({ blogs , addnewBlog, blogFormRef, setBlogObj, user }) => {
    const handlePhotoChange = (e) => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
            })
        }
    }
    const [image, setImage] = useState({
        preview: '',
        raw: ''
    })
    const likeBlog = async (id) => {
        try {
            const blogLiked = await blogService.putBloglikes(id)
            console.log(blogLiked)
            const updatedBlogs = await blogService.getBlogs()
            setBlogObj(updatedBlogs)
        } catch (exception) {
            console.log(exception)
        }
    }
    console.log(blogs)
    return (
        <>
            <Toggleable buttonLabel={'Create'} ref={blogFormRef}>
                <BlogForm
                    createBlog={addnewBlog}
                    handlePhotoChange={handlePhotoChange}
                    image={image}/>
            </Toggleable>
            <div style={{ background:'#ddd' }}>
                <h2>ALL Blogs</h2>
                {
                    blogs.map( blog => (
                        <div key={blog._id}>
                            <BlogShow blog={blog} likeOption={likeBlog} user={user}/>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default BlogHome