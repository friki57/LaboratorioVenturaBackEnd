import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PacienteSchema = new Schema(
    {
        CodigoPaciente: String,
        CI: String,
        Nombres: String,
        PrimerApellido: String,
        SegundoApellido: String,
        Fecha_de_Nacimiento: String,
        Genero: String,
        Telefono: Number,
        Direccion: String,
        RazonSocial: String,
        NIT: String,
        Email: String,
        Password: String
    }
)

export default mongoose.model("pacienteEliminado", PacienteSchema);