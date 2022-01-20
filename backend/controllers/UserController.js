const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')

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
            await createUserToken(newUser, req, res)
        } catch (e) {
            res.status(500).json({ message: e })
        }


    }

    static async login(req, res) {
        const { email, password } = req.body

        //validation
        if (!email) {
            return res.status(422).json({ message: 'O email é obrigatório' })
        }
        if (!password) {
            return res.status(422).json({ message: 'A senha é obrigatória' })
        }

        //check if user exists
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(422).json({ message: 'Email não existe!' })
        }

        //check password
        const confirmpassword = bcrypt.compareSync(password, user.password)

        if (!confirmpassword) {
            return res.status(422).json({ message: 'Senha Inválida' })
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {

        let currentUser
        console.log(req.headers.authorization)

        if (req.headers.authorization) {

            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined

        } else {
            currentUser = null
        }

        res.status(200).json(currentUser)

    }

    static async getUserById(req, res) {
        try {
            const id = req.params.id

            const user = await User.findById(id).select('-password')

            if (!user) {
                return res.status(422).json({ message: 'Usuário não Encontrado!' })
            }

            res.status(200).json(user)
        } catch (e) {
            console.log(e.message)
        }
    }

    static async editUser(req, res) {
        return res.status(200).json({
            message: 'Upadate com Sucesso!'
        })
    }
}