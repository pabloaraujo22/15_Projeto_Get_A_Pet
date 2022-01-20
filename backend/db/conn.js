const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/getapet')
    console.log('Conectou ao mongoose')
}

main().catch((err) => console.log(`Erro: ${err.message}`))

module.exports = mongoose