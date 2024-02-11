import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
const BlogForm = ({ createBlog, handlePhotoChange, image }) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        content: '',
        url:'',
        likes: 0
    })
    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlog.title,
            content: newBlog.content,
            url:newBlog.url,
            image:image.raw
        })
        setNewBlog({
            title: '',
            content: '',
            url:'',
            image:null
        })
        image.preview = null
    }

    return(
        <Form onSubmit={addBlog}>
            <Form.Group>
                <Form.Label>Title : </Form.Label>
                <Form.Control type='text' name='title' value={newBlog.title}
                    onChange={(event) => setNewBlog({ ...newBlog,title:event.target.value })}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Content : </Form.Label>
                <Form.Control type='text' name='author' value={newBlog.content}
                    onChange={(event) => setNewBlog({ ...newBlog,content:event.target.value })}/>
                <Form.Control
                    name="image"
                    type="file"
                    id="upload-button"
                    style={{ display: 'none' }}
                    onChange={handlePhotoChange}
                />
            </Form.Group>
            <Form.Label htmlFor="upload-button">
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
            </Form.Label>
            <Form.Group>
                <Button variant='primary' type='submit'>Save</Button>
            </Form.Group>
        </Form>
    )
}
export default BlogForm