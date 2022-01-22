const Pet = require('../models/Pet')


//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId
const { use } = require('../routes/PetRoutes')
const { get } = require('mongoose')

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

    static async updatePet(req, res) {
        const id = req.params.id
        const { name, age, weight, color, available } = req.body
        const images = req.files

        const updateData = {}
        let pet;

        //check if pet exists
        if (!ObjectId.isValid(id)) {
            return res.status(422).json({ message: 'Id inválido' })
        }
        try {
            pet = await Pet.findById(id)
            if (!pet) {
                return res.status(404).json({ message: 'Pet não existe' })
            }

            //check pet user
            const token = getToken(req)
            const user = await getUserByToken(token)

            if (pet.user._id.toString() !== user._id.toString()) {
                return res.status(422).json({ message: 'Erro ao processar sua solicitação, tente novamente mais tarde!' })
            }


        } catch (e) {
            res.status(500).json({ message: `Erro: ${e.message}` })
        }


        //validations
        if (!name) {
            return res.status(422).json({ message: 'O nome é obrigatorio!' })
        } else {
            updateData.name = name
        }

        if (!age) {
            return res.status(422).json({ message: 'A idade é obrigatorio!' })
        } else {
            updateData.age = age
        }

        if (!weight) {
            return res.status(422).json({ message: 'O peso é obrigatorio!' })
        } else {
            updateData.weight = weight
        }

        if (!color) {
            return res.status(422).json({ message: 'A cor é obrigatorio' })
        } else {
            updateData.color = color
        }

        if (!available) {
            res.status(422).json({ message: 'O status é obrigatório' })
        }

        if (images.lenght > 0) {
            updateData.images = []
            images.map(image => {
                updateData.images.push(image.filename)
            })
        }

        try {
            await Pet.findByIdAndUpdate(id, updateData)
            res.status(200).json({
                message: `Pet atualizado com sucesso!`
            })
        } catch (e) {
            res.status(500).json({ message: `Erro: ${e.message}` })
        }


    }

    static async schedule(req, res) {
        const id = req.params.id
        let pet;
        //check if Pet id exists
        if (!ObjectId.isValid(id)) {
            return res.status(422).json({ message: 'Id inválido' })
        }
        //check if pet exists
        try {
            pet = await Pet.findById(id)
            if (!pet) {
                return res.status(404).json({ message: 'Pet não Existe' })
            }
        } catch (e) {
            res.status(500).json({ message: `Erro: ${e.message}` })
        }

        //check if user registered the Pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.equals(user._id)) {
            return res.status(422).json({ message: 'Você não pode agendar uma visita com o seu proprio Pet!' })
        }

        //check if user has already sheduled a visit
        if (pet.adopter) {
            if (pet.adopter._id.equals(user._id)) {
                return res.status(422).json({ message: 'Você já agendou uma visita para este pet!' })
            }
        }
        //add user to pet
        pet.adopter = {
            _id: user._id,
            name: user.name,
            phone: user.phone
        }

        try {
            await Pet.findByIdAndUpdate(id, pet)
            res.status(200).json({
                message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`
            })
        } catch (e) {
            res.status(500).json({ message: `Erro: ${e.message}` })
        }
    }

    static async concludeAdoption(req, res) {
        const id = req.params.id
        let pet;
        //check if id valid
        if (!ObjectId.isValid(id)) {
            return res.status(422).json({ message: 'id inválido!' })
        }
        //check if Pet Exists
        try {
            await Pet.findById(id)
            if (!pet) {
                return res.status(404).json({ message: 'Pet não encontrado!' })
            }
        } catch (e) {
            res.status(500).json({ message: `Erro: ${e.message}` })
        }

        //check if logged in user registered the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if (!pet.user._id.equals(user._id)) {
            return res.status(422).json({ message: 'Erro ao processar sua solicitação, tente novamente mais tarde!' })
        }

        try {
            pet.available = false
            await Pet.findByIdAndUpdate(id, pet)
            res.status(200).json({ message: `Parabéns! O ciclo de adoção foi finalizado com sucesso!` })
        } catch (e) {
            res.status(500).json({ message: `Erro: ${e.message}` })
        }

    }
}