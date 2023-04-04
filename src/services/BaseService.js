import axios from 'axios';
import { getAccessToken, logout } from '../stores/AccessTokenStore'

const INVALID_STATUS_CODES = [401];

export const createHttp = (useAccessToken = false) => { // Si le pongo true, manda el token si le pone false no hay cabecera Authorization
    const http = axios.create({
        baseURL: import.meta.env.VITE_SERVER_URL
    })

    
    http.interceptors.request.use(
        (config) => {
            if (useAccessToken && getAccessToken()) {
                config.headers.Authorization = `Bearer ${getAccessToken()}`
            }

            return config 
        },
        err => Promise.reject(err)
    )

    http.interceptors.response.use(
        (response) => response.data,
        (error) => {
            if (error?.response?.status && INVALID_STATUS_CODES.includes(error.response.status)) {
                if (getAccessToken()) {
                  logout()
                //   if (window.location.pathname !== "/login") {
                //     window.location.assign("/login");
                //   }
                }
              }
        
              return Promise.reject(error)
            }
    )
        
    return http;
}
