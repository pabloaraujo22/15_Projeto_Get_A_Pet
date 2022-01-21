const Pet = require('../models/Pet')


//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class PetController {
    //create a pet
    static async create(req, res) {
        const { name, age, weight, color } = req.body

        console.log(name)
        const available = true

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

        try {
            const newPet = await pet.save()
            res.status(201).json({ message: 'Pet criado com sucesso', newPet })
        } catch (e) {
            res.status(500).json({ message: `Erro ao criar o Pet!: ${e.message}` })
        }
    }
}