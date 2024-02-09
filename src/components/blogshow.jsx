import '../App.css'
import {  useNavigate } from 'react-router-dom'

const BlogShow = ({ blog, likeOption, user }) => {
    let likecheck = blog.likes.includes(user.id)
    const modifyButton = blog.user._id === user.id ? { display:'block' } : { display: 'none' }
    const navigate = useNavigate()
    return (
        <div className='card'>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
                <h2>{blog.title}</h2>
                <button onClick={ () => navigate(`/blogedit/${blog._id}`)}className='modifyButton' style={ modifyButton}>Edit</button>
            </div>
            <div className='imagebox'>{blog.image && (
                <img src={`http://localhost:3001/${blog.image}`} alt={`Image for ${blog.title}`} />
            )}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
                <div style={{ display:'flex' }}>
                    <button style={{ marginRight:'5px' }}onClick={() => likeOption(blog._id)}>{ likecheck ? 'Unlike' :'Like'}</button>
                    <div>{blog.likes !== undefined ? blog.likes.length : 0} users like this</div>
                </div>
                <div>By: {blog.user.name}</div>
            </div>
            <div>{blog.content}</div>
        </div>
    )
}
export default BlogShow