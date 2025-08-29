import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://julian:1193051330@cluster0.evmggcd.mongodb.net/aerolinea",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("✅ Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};

export default conectarDB;
