const DbConfig = require('../config/db-config.js')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

//configuración de base de datos
const database = {}
database.mongoose = mongoose
database.url = DbConfig.url
database.todo = require('./todo.js')(mongoose)

//exportando objeto de base de datos
module.exports = database