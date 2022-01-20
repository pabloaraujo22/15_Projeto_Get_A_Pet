const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = class UserController {

    static async register(req, res) {

        const { name, email, phone, password, confirmpassword } = req.body

        //validation
        if (!name) {
            return res.status(422).json({ message: 'O nome é obrigatorio' })
        }
        if (!email) {
            return res.status(422).json({ message: 'O email é obrigatorio' })
        }
        if (!phone) {
            return res.status(422).json({ message: 'O Telefone é obrigatorio' })
        }
        if (!password) {
            return res.status(422).json({ message: 'A senha é obrigatorio' })
        }
        if (!confirmpassword) {
            return res.status(422).json({ message: 'A confirmação de senha é obrigatorio' })
        }
        if (password !== confirmpassword) {
            return res.status(422).json({ message: 'As senhas devem ser iguais' })
        }

        //check User Exists

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(422).json({ message: 'Por favor utilize outro email!' })
        }


        //create password
        const salt = bcrypt.genSaltSync(12)
        const passwordHash = bcrypt.hashSync(password, salt)

        //create user
        const user = new User({ name, email, phone, password: passwordHash })

        try {
            const newUser = await user.save()
            res.status(201).json({ message: 'Usuário Criado', newUser })
        } catch (e) {
            res.status(500).json({ message: e })
        }


    }

}