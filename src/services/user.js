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
export default { createUserAxios }