const axios = require('axios');

export const myAxios = axios.create({
    baseURL: 'https://project-personel.herokuapp.com/api/v1',
    withCredentials: true
});

myAxios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = 'Bearer ' + token;
    return config;
});
myAxios.interceptors.response.use(function (response) {
    if (response) {
        return response;
    }
}, async function (error) {
    if (error.response) {
        /* if error code = 401 (token failure) -> get new token using refreshToken and
         redo the previous request by using new token
        */
        if (error.response.status === 401) {
            const refreshToken = localStorage.getItem('refreshToken');
            await myAxios.post('/auth/refresh', { refreshToken }).then(response => {
                if (response && response.data) {
                    const data = response.data;
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    error.config.headers['Authorization'] = 'Bearer ' + data.token;
                    return myAxios.request(error.config);
                }
            });
        }
        //if error code = 404 (refreshToken failure) -> remove existing token and redirect to homepage
        else if (error.response.status === 402) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            window.location = "/"
        }
    }
    else {
        return Promise.reject(error);
    }
});