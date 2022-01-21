const jwt = require('jsonwebtoken')
const User = require('../models/User')

const getUserByToken = async(token) => {
    if (!token) {
        return res.status(401).json({ message: 'Acesso Negado!' })
    }

    try {
        const decoded = jwt.verify(token, 'nossosecret')
        const userId = decoded.id
        const user = await User.findById(userId)
        return user
    } catch (e) {
        res.status(400).json({ message: 'Token invalido' })
    }
}

module.exports = getUserByToken