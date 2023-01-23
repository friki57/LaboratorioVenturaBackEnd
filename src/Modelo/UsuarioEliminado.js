import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema(
    {
        CI: String,
        Nombres: String,
        PrimerApellido: String,
        SegundoApellido: String,
        Fecha_de_Nacimiento: String,
        Genero: String,
        Telefono: Number,
        Direccion: String,
        Tipo: String,
        Cargo: String,
        Email: String,
        Password: String
    }
)

export default mongoose.model("usuarioEliminado", UsuarioSchema);