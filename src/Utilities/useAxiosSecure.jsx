import axios from "axios";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
    baseURL:
        // 'https://mobile-financial-service-server-gamma.vercel.app'
        'http://localhost:4000'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });


    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {

        // console.log('error stopped by interceptors', error.response.status)
        if (error.response.status === 401 || error.response.status === 403) {
            localStorage.removeItem('access-token');
            localStorage.removeItem('user');
            navigate('/login');
        }
        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;