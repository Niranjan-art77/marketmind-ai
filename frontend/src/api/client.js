import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
const HEALTH_CHECK_URL = 'http://localhost:8000/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const checkHealth = async () => {
    try {
        const response = await axios.get(HEALTH_CHECK_URL);
        return response.data.status === 'active';
    } catch (error) {
        return false;
    }
};

export const analyzeCompetitor = async (url) => {
    try {
        const response = await api.post('/competitor/analyze', { url });
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw { detail: "Backend unreachable. Please ensure the server is running." };
        }
        throw error.response.data;
    }
};

export const simulateRevenue = async (data) => {
    try {
        const response = await api.post('/revenue/simulate', data);
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw { detail: "Backend unreachable. Please ensure the server is running." };
        }
        throw error.response.data;
    }
};

export const generateCampaign = async (data) => {
    try {
        const response = await api.post('/campaign/generate', data);
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw { detail: "Backend unreachable. Please ensure the server is running." };
        }
        throw error.response.data;
    }
};

export const sendChatMessage = async (message, context = "") => {
    try {
        const response = await api.post('/chat/send', { message, context });
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw { detail: "Backend unreachable." };
        }
        throw error.response.data;
    }
};

export default api;
