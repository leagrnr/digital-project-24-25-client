import axios from 'axios';


const back = import.meta.env.VITE_BACK_END;

if (!back) {
    throw new Error("La variable d'environnement REACT_APP_BACK_END n'est pas définie.");
}

const apiClient = axios.create({
    baseURL: back + '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;