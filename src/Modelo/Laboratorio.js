import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ResultadosSchema = new Schema(
    {
        Valor: String,
        Id_Campo: String,
        Metodo: String
    }
)
const ExamenesRealizadosSchema = new Schema(
    {
        IdExamen: String, //
        Estado: String, //
        Observaciones: String,
        Resultados: [ResultadosSchema]
    }
)
const LaboratorioSchema = new Schema(
    {
        IdPaciente: String, //
        IdUsuario: String,
        Fecha: String, //
        FechaDeEntrega: String, //
        Motivo: String, //
        IdDoctor: String,
        FormaPago: String,
        Costo: Number,
        Descuento: Number,
        Pagado: Number,
        // FechaRecoger: String,
        ExamenesRealizados: [ExamenesRealizadosSchema] //
    }
)

export default mongoose.model("laboratorio", LaboratorioSchema);