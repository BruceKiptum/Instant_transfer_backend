require('dotenv').config();
const { getToken, getUserInfo } = require('../services/authService');
const User = require('../models/userModel'); // Import User model

const AUTH_URL = process.env.AUTH_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;

exports.login = (req, res) => {
    const authUrl = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    res.redirect(authUrl);
};

exports.callback = async (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).send("Authorization failed!");

    try {
        const tokenData = await getToken(code);
        const userInfo = await getUserInfo(tokenData.access_token);

        // Check if user exists in the DB
        let user = await User.findOne({ derivId: userInfo.id });

        if (!user) {
            user = new User({
                derivId: userInfo.id,
                name: userInfo.name,
                email: userInfo.email,
                country: userInfo.country,
                createdAt: new Date()
            });

            await user.save();
        }

        res.cookie('token', tokenData.access_token, { httpOnly: true });
        res.send("Login Successful!");
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.userInfo = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("Unauthorized!");

    try {
        const userInfo = await getUserInfo(token);
        res.json(userInfo);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.send("Logged out!");
};