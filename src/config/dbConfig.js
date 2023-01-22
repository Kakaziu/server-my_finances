const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

const connection = mongoose.connect(process.env.MONGO_URL_CONNECTION)

module.exports = connection