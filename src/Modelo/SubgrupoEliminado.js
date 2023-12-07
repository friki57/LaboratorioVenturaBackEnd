import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SubgrupoSchema = new Schema(
    {
        Nombre: String,
        Grupo: String,
    }
)

export default mongoose.model("subgrupoeliminado", SubgrupoSchema);