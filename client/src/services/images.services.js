import axios from "axios"

class ImagesService {

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
    
   create = imageData => {
      return this.api.post('/images/image',imageData) 
   }
}

const imagesService = new ImagesService()
export default imagesService