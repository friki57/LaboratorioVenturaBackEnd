import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ResultadosSchema = new Schema(
    {
        Valor: String,
        Id_Campo: String,
        Metodo: String
    }
)
const LaboratorioSchema = new Schema(
    {
        IdExamen: String,
        Estado: String,
        Observaciones: String,
        Resultados: [ResultadosSchema]
    }
)

export default mongoose.model("laboratorio", LaboratorioSchema);