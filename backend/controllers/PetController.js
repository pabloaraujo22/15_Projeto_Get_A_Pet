const Pet = require('../models/Pet')


//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId
const { use } = require('../routes/PetRoutes')

module.exports = class PetController {
    //create a pet
    static async create(req, res) {
        const { name, age, weight, color } = req.body

        console.log(age)
        const available = true

        //images
        const images = req.files

        //check validations
        if (!name) {
            return res.status(422).json({ message: 'O nome é obrigatório' })
        }
        if (!age) {
            return res.status(422).json({ message: 'A idade é obrigatório' })
        }
        if (!weight) {
            return res.status(422).json({ message: 'O Peso é obrigatório' })
        }
        if (!color) {
            return res.status(422).json({ message: 'A cor é obrigatório' })
        }
        if (images.lenght === 0) {
            return res.status(422).json({ message: 'A imagem é obrigatória' })
        }

        //user
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                phone: user.phone,
                image: user.image
            },
        })

        images.map(image => {
            pet.images.push(image.filename)
        })


        try {
            const newPet = await pet.save()
            res.status(201).json({ message: 'Pet criado com sucesso', newPet })
        } catch (e) {
            res.status(500).json({ message: `Erro ao criar o Pet!: ${e.message}` })
        }
    }

    static async getAll(req, res) {
        const pets = await Pet.find().sort('-createdAt') //sort ordena (-) ordem crescente
        res.status(200).json({ pets })
    }

    static async getAllUserPets(req, res) {
        //get user from token
        const token = getToken(req)
        const user = await getUserByToken(token)

        try {
            const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt')
            res.status(200).json({ pets })
        } catch (e) {
            res.status(500).json({ message: `Erro: ${e.message}` })
        }

    }

    static async getAllUserAdoptions(req, res) {
        //get pets from user
        const token = getToken(req)
        const user = await getUserByToken(token)

        try {
            const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt')
            res.status(200).json({ pets })
        } catch (e) {
            res.status(500).json({ message: `Erro: ${e.message}` })
        }

    }

    static async getPetById(req, res) {
        const _id = req.params.id

        if (!ObjectId.isValid(_id)) {
            res.status(422).json({
                message: 'Id Invalido!'
            })
        }

        try {
            const pet = await Pet.findById(_id)
            if (!pet) {
                res.status(404).json({
                    message: `Pet não encontrado`
                })
            }
            res.status(200).json({ pet })
        } catch (e) {
            res.status(500).json({
                message: `Erro: ${e.message}`
            })
        }
    }

    static async removePetById(req, res) {
        //id from pet
        const id = req.params.id

        //get user from token
        const token = getToken(req)
        const user = await getUserByToken(token)

        if (!ObjectId.isValid(id)) {
            res.status(422).json({
                message: 'Id inválido!'
            })
        }
        try {
            const pet = await Pet.findOne({ _id: id })
            if (!pet) {
                res.status(404).json({
                    message: 'Pet não encontrado!'
                })
            }

            if (pet.user._id.toString() !== user._id.toString()) {
                res.status(422).json({
                    message: 'Erro ao processar sua solicitação, tente novamente mais tarde!'
                })
            }

            await Pet.findByIdAndDelete({ _id: id })

            res.status(200).json({
                message: 'Pet deletado com sucesso'
            })
        } catch (e) {
            res.status(500).json({
                message: `Erro: ${e.message}`
            })
        }

    }
}