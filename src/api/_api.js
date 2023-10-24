import axios from 'axios';
import tokenService from '@/services/_token';
import router from '@/routes';


class ApiService {
    constructor() {
        this._401interceptor = null;
    }

    static async verifyToken() {
        try {
            const refreshToken = tokenService.getRefreshToken();
            if (refreshToken || tokenService.getToken()) {
                ApiService.setHeader(refreshToken)
                const response = await ApiService.post('/auth/verify-token');
                return response.status === 200;
            }
            return false
        } catch (error) {
            return false;
        }
    }

    static async refreshToken() {
        try {
            const refreshToken = tokenService.getRefreshToken();
            const response = await this.post('/auth/refresh-token', { refresh_token: refreshToken });

            if (response.status === 200) {
                tokenService.setToken(response.data.token);
                this.setHeader();
                return response.data.token;
            }

            return null;
        } catch (error) {
            return null;
        }
    }

    static async mount401Interceptor() {
        this._401interceptor = axios.interceptors.response.use(
            response => {
                return response;
            },
            async error => {
                const originalRequest = error.config;


                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const newToken = await this.refreshToken();

                    if (newToken) {
                        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                        return axios(originalRequest);
                    } else {
                        tokenService.removeToken();
                        tokenService.removeRefreshToken();
                        router.replace({ name: 'Login' });
                        return Promise.reject(error);
                    }
                }

                // Se não for um erro 401 ou o request já foi reenviado, apenas rejeita o erro.
                return Promise.reject(error);
            }
        );
    }

    static async unmount401Interceptor() {
        axios.interceptors.response.eject(this._401interceptor);
    }

    static async init(baseURL) {
        axios.defaults.baseURL = baseURL;
    }

    static async setHeader(token) {
        if (!token)
            token = tokenService.getToken()

        if (this._401interceptor) {
            this.unmount401Interceptor()
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    static async removeHeader() {
        axios.defaults.headers.common = {};
    }

    static async get(resource) {
        return await axios.get(resource);
    }

    static async post(resource, data) {
        return await axios.post(resource, data);
    }

    static async put(resource, data) {
        return await axios.put(resource, data);
    }

    static async patch(resource, data) {
        return await axios.patch(resource, data);
    }

    static async delete(resource, config) {
        return await axios.delete(resource, config);
    }

    static readUrl(url) {
        if (!url) return;
        return this.get(url);
    }

    static instanceAxios(data) {
        return axios(data);
    }
}

export default ApiService;
export { ApiService };
