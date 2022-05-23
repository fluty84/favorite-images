import axios from 'axios'

class UploadService {

    constructor() {

        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/images` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    uploadImage = uploadData => {
        return this.api.post('/upload', uploadData)
    }
}

const uploadService = new UploadService()

export default uploadService