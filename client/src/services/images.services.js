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

   getAll = owner => {
       return this.api.get('/images', {owner})
   }

   delete = id => {
       return this.api.post('images/delete', id)
   }
}

const imagesService = new ImagesService()
export default imagesService