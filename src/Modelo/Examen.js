import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CamposSchema = new Schema(
    {
        Nombre: String,
        ValorReferencia: String,
        Concentración: String,
    }
)
const ExamenSchema = new Schema(
    {
        Nombre: String,
        Estado: Number,
        Categoria: String,
        Metodo: String,
        Campos: [CamposSchema]
    }
)

export default mongoose.model("examen", ExamenSchema);