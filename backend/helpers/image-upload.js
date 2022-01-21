const multer = require('multer')
const path = require('path')
const fs = require('fs')
const getToken = require('./get-token')
const jwt = require('jsonwebtoken')

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = ''
        const token = getToken(req)
        const user = jwt.verify(token, 'nossosecret')
        console.log(__dirname)

        if (req.baseUrl.includes('users')) {
            folder = 'users'
        } else if (req.baseUrl.includes('pets')) {
            folder = 'pets'
        }
        // const base = `public/images/${folder}/${user.id}`
        // if (!fs.existsSync(base)) {
        //     fs.mkdirSync(base)
        // }

        // cb(null, base)
        cb(null, `public/images/${folder}`)

    },
    filename: (req, file, cb) => {
        // cb(null, file.originalname)
        cb(null, Date.now() + Math.floor(Math.random() * 100) + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('Por favor, envie apenas jpg ou png'))
        }

        cb(undefined, true)
    }
})

module.exports = imageUpload