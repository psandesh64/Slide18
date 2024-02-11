import axios from 'axios'
const baseUrl = '/api/user'

const createUserAxios = async (obj) => {
    try {
        const response = await axios.post(baseUrl, obj)
        return response.data
    } catch (error) {
        console.error('Error Creating User:', error)
        throw error
    }
}

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAllUserAxios = async () => {
    try {
        const response = await axios.get(`${baseUrl}`)
        return response.data
    } catch (error) {
        console.error('Error Fetching User:', error)
        throw error
    }
}
const getUserAxios = async (id) => {
    const config = {
        headers: { Authorization: token }
    }
    try {
        const response = await axios.get(`${baseUrl}/${id}`,config)
        return response.data
    } catch (error) {
        console.error('Error Creating User:', error)
        throw error
    }
}
const followAxios = async (id) => {
    const config = {
        headers: { Authorization: token }
    }
    try {
        const response = await axios.put(`${baseUrl}/follow/${id}`,null,config)
        return response.data
    } catch (error) {
        console.error('Error Creating User:', error)
        throw error
    }
}
export default { createUserAxios,getAllUserAxios,getUserAxios,followAxios,setToken }