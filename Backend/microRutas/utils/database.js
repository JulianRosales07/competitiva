const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://admin:admin@cluster0.xblxobg.mongodb.net/backend',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log('MongoDB Atlas conectado correctamente');
  } catch (error) {
    console.error('Error al conectar con MongoDB Atlas', error);
    process.exit(1);
  }
};

module.exports = connectDB;
