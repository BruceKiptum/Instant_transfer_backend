const axios = require('axios');
require('dotenv').config();

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, TOKEN_URL } = process.env;

const getToken = async (code) => {
    try {
        const response = await axios.post(TOKEN_URL, new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI
        }).toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching token:", error.response?.data || error.message);
        throw new Error("Failed to retrieve access token.");
    }
};

const getUserInfo = async (accessToken) => {
    try {
        const response = await axios.get("https://api.deriv.com/userinfo", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching user info:", error.response?.data || error.message);
        throw new Error("Failed to fetch user information.");
    }
};

module.exports = { getToken, getUserInfo };