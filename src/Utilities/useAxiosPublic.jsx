import axios from "axios";

const axiosPublic = axios.create({
    baseURL:
        // 'https://mobile-financial-service-server-gamma.vercel.app'
        'http://localhost:3000'
})

export default axiosPublic;