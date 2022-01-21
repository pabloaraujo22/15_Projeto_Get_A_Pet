const express = require('express')
const cors = require('cors')

const app = express()

//Config JSON response
app.use(express.json())

//Solve CORS
app.use(cors({ credentials: true, originÇ: 'http://localhost:3000' }))

//Public folder images
app.use(express.static('Public'))

//Routes
const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

app.listen(5000)