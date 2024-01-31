import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const createBlog = async params => {
    const config = {
        headers: { Authorization: token }
    }
    console.log(config.headers)
    const response = await axios.post(baseUrl,params,config)
    return response.data
}

const getBlogs = async () =>{
    const response = await axios.get(baseUrl)
    return response.data
}
const putBloglikes = async (id) => {
    const config = {
        headers: { Authorization: token }
    };

    try {
        const response = await axios.put(`${baseUrl}/like/${id}`, null, config);
        return response.data;
    } catch (error) {
        console.error('Error updating blog likes:', error);
        throw error;
    }
}
const deleteBlog = async (id) => {
    const config = {
        headers: { Authorization: token }
    }

    try {
        const response = await axios.delete(`${baseUrl}/${id}`, config);
        return response.data;
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
}
export default { createBlog, setToken, getBlogs, putBloglikes, deleteBlog}