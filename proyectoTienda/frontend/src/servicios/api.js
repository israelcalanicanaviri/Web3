import axios from 'axios';

// Configuramos la URL base apuntando a tu backend MVC
const api = axios.create({
    baseURL: 'http://localhost:3001'
});

export default api;