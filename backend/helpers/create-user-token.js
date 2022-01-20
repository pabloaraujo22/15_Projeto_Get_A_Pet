const jwt = require('jsonwebtoken')

const createUserToken = async(user, req, res) => {
    //create token
    const token = jwt.sign({
            name: user.name,
            id: user._id,
        }, "nossosecret") //Uma string complexa para proteção do token

    //return token
    res.status(200).json({
        message: 'Você esta autenticado',
        token,
        userId: user._id
    })
}
module.exports = createUserToken