import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GrupoSchema = new Schema(
    {
        Nombre: String
    }
)

export default mongoose.model("grupo", GrupoSchema);