const router = require('express').Router()

const PetController = require('../controllers/PetController')

//Middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, PetController.create)
router.post('/teste', PetController.teste)


module.exports = router