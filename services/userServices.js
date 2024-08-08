
const { conn } = require('../db/conn');

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

module.exports = {
    isUserExists,
    isPasswordCorrect
}