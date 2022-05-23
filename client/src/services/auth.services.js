import axios from "axios"

class AuthService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5005/api'
        })

            this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {

                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
            
            })
    }

    verify(token) {
        return this.api.get('/auth/verify', { headers: { Authorization: `Bearer ${token}` } })
    }
    
    login = user => {
        return this.api.post('/auth/loginUser', user)
    }

    create = user => {
        return this.api.post('/user/create', user)
    }
  
}

const authService = new AuthService()

export default authService