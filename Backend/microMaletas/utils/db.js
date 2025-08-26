// src/config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI || 'mongodb+srv://admin:admin@cluster0.xblxobg.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Conectado a MongoDB Atlas (src/config/db.js)'))
  .catch((err) => console.error('❌ Error de conexión a MongoDB (src/config/db.js):', err));

module.exports = mongoose;
