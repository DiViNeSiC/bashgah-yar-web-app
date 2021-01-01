import axios from 'axios'
import baseURL from '../Constants/backendUrl'

export default (history = null) => {
    let headers = {}
    const entryToken = localStorage.BASHGAH_YAR_ENTRY_TOKEN
    if (entryToken) headers.Authorization = `Bearer ${entryToken}`

    const axiosInstance = axios.create({ baseURL, headers })
    axiosInstance.interceptors.response.use((response) =>
        new Promise((resolve, reject) => {
            resolve(response)
        }),
        (err) => {
            if (!err.response) return new Promise((resolve, reject) => { reject(err) }) 
    
            if (err.response.status === 401 && headers.Authorization) {
                localStorage.removeItem('BASHGAH_YAR_ENTRY_TOKEN')
                localStorage.removeItem('BASHGAH_YAR_REFRESH_TOKEN')
                if (history) history.push('/login')
                if (!history) window.location = '/login'
            }
            
            return new Promise((resolve, reject) => { reject(err) })
        }
    )
    return axiosInstance
}