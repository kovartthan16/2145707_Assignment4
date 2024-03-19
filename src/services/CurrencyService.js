import axios from 'axios';

const API_BASE_URL = 'http://localhost:9090/api/v1';

class CurrencyService {
    static getToken() {
        return sessionStorage.getItem('jwttoken');
    }

    static getConfig() {
        const token = CurrencyService.getToken();
        return {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Content-Type": "application/json",
            },
        };
    }

    static async fetchCurrencies() {
        try {
            const config = CurrencyService.getConfig();
            const response = await axios.get(`${API_BASE_URL}/currencies/fetchCurrencies`, {headers: config.headers});
            return response.data;
        } catch (error) {
            console.error('Error fetching crypto currencies:', error);
            throw error;
        }
    }

    static async saveCurrency(currency) {
        try {
            const config = CurrencyService.getConfig();
            const response = await axios.post(`${API_BASE_URL}/currencies/saveCurrency`,currency,{
                headers: config.headers
            });
            return response.data;
        } catch (error) {
            console.error('Error saving currency:', error);
            throw error;
        }
    }

    static async getWishlist() {
        try {
            const config = CurrencyService.getConfig();
            const response = await axios.get(`${API_BASE_URL}/currencies`, config);
            return response.data;
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            throw error;
        }
    }

    static async deleteCurrency(currency) {
        try {
            const config = CurrencyService.getConfig();
            const response = await axios.delete(`${API_BASE_URL}/currencies/deleteCurrency`, {
                headers: config.headers,
                data: currency,
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting currency:', error);
            throw error;
        }
    }
}

export default CurrencyService;
