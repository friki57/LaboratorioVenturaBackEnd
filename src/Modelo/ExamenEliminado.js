import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CamposSchema = new Schema(
    {
        Nombre: String,
        ValorReferencia: String,
        Concentracion: String,
        SubCategoria: String
    }
)
const ExamenSchema = new Schema(
    {
        Nombre: String,
        Estado: Number,
        Categoria: String,
        Metodo: String,
        Materia: String,
        Campos: [CamposSchema]
    }
)

export default mongoose.model("examenEliminado", ExamenSchema);