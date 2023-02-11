import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ValRefSchema = new Schema(
    {
        EdadMinima: String,
        EdadMaxima: String,
        Concentracion: String,
        ValoresReferenciaHombre: String,
        ValoresReferenciaMujer: String,
    }
)
const CamposSchema = new Schema(
    {
        Nombre: String,
        ValorReferencia: [ValRefSchema],
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
        Recipiente: String,
        Muestra: String,
        Gastos: String,
        Precio: String,
        InformacionClinica: String,
        Campos: [CamposSchema]
    }
)

export default mongoose.model("examen", ExamenSchema);