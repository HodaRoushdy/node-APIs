const jwt = require('jsonwebtoken');
const { conn } = require('../db/conn');

const secretKey = 'secret_key';

const isUserExists = (username) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM users WHERE userName = '${username}'`, (error, element) => {
            if (error) {
                return reject(error)
            }
            return resolve(element.length)
        })
    })
}
const isPasswordCorrect = (username,password) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM users WHERE userName = '${username}'`, (error, element) => {
            if (error) {
                return reject(error)
            }
            const user = element[0];
            if (user.password === password) {
            return resolve(user)
            }
            return resolve(false)
        })
    })
}

const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.send ("please enter username and password")
        }
        console.log(username);
        if (await isUserExists(username)) {
            const userCheckInfo = await isPasswordCorrect(username, password)
            if (userCheckInfo) {
                const stringUser = JSON.stringify(userCheckInfo)
                console.log(stringUser)
                const token = jwt.sign({ username, password }, secretKey, { expiresIn: '1h' });
                // await res.cookie('token',token)
                await res.send(token);
            } else {
                await res.send("invalid username or password")
        }
        }
        else {
            await res.send(" username doesn't exists")
        }
    } catch (error) {
        console.log(error)
    }
}

// const Refresh = async (req, res) => {
//     const refreshToken = req.cookies['refreshToken'];
//     if (!refreshToken) {
//     return res.status(401).send('Access Denied. No refresh token provided.');
//     }
//     try {
//     const decoded = jwt.verify(refreshToken, secretKey);
//     const accessToken = jwt.sign({ user: decoded.user }, secretKey, { expiresIn: '1h' });
//     res
//         .header('Authorization', accessToken)
//         .send(decoded.user);
//     } catch (error) {
//     return res.status(400).send('Invalid refresh token.');
//     }
// }

const Logout = async (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
}

module.exports = {
    Login,
    // Refresh
}