import { useState } from 'react'

const BlogForm = ({ createBlog, handlePhotoChange, image }) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url:'',
        likes: 0
    })
    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlog.title,
            author: newBlog.author,
            url:newBlog.url,
            image:image.raw
        })
        setNewBlog({
            title: '',
            author: '',
            url:'',
            image:null
        })
    }

    return(
        <form onSubmit={addBlog}>
            <label>Title : </label>
            <input type='text' name='title' value={newBlog.title}
                onChange={(event) => setNewBlog({ ...newBlog,title:event.target.value })}/>
            <label>Author : </label>
            <input type='text' name='author' value={newBlog.author}
                onChange={(event) => setNewBlog({ ...newBlog,author:event.target.value })}/>
            <input
                name="image"
                type="file"
                id="upload-button"
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
            />
            <label htmlFor="upload-button">
                { image.preview ? (
                    <img
                        src={image.preview}
                        alt="dummy"
                        width="80"
                        className="my-10 mx-5"
                    />
                ) : (
                    <>
                        <span>
                            Upload Image
                        </span>
                    </>
                )}
            </label>

            <button type='submit'>Save</button>
        </form>
    )
}
export default BlogForm