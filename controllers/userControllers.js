const jwt = require('jsonwebtoken');
require('dotenv').config()
const { conn } = require('../db/conn');
const { isPasswordCorrect, isUserExists } = require('../services/userServices');

// const secretKey = 'secret_key';
const secretKey = process.env.SECRET_KEY


const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.send("please enter username and password");
        }
        if (await isUserExists(username)) {
            const userCheckInfo = await isPasswordCorrect(username, password)
            if (userCheckInfo) {
                const { userName, role } = JSON.parse(JSON.stringify(userCheckInfo));                const accessToken = jwt.sign({ username:userName, role }, secretKey, { expiresIn: '5s' });
                const refreshToken = jwt.sign({ username:userName, role }, secretKey, { expiresIn: '10s' });
                    await res
                    .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
                    .cookie('Authorization', accessToken)
                .send(accessToken)
                    
            } else {
                await res.status(401).send("invalid username or password")
        }
        }
        else {
            await res.status(401).send("username doesn't exists");
        }
    } catch (error) {
        console.log(error)
    }
}

const Refresh = async (req, res) => {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
        res.clearCookie('refreshToken');
        res.clearCookie('Authorization');

    return res.status(401).send('Access Denied. No refresh token provided.');
    }
    try {
        const decoded = jwt.verify(refreshToken, secretKey,);
        const { userName, role } = JSON.parse(JSON.stringify(decoded));
        const accessToken = jwt.sign({username:userName, role} , secretKey, { expiresIn: '5s' });
        res
        .cookie('Authorization', accessToken)
        .send(accessToken);
    } catch (error) {
    res.clearCookie('refreshToken');
    res.clearCookie('Authorization');
    return res.status(401).send('Access Denied. Refresh Token expired.');
    }
}

const Logout = async (req, res) => {

    res.clearCookie('refreshToken');
    res.clearCookie('Authorization');
    res.send()
}

module.exports = {
    Login,
    Refresh,
    Logout
}