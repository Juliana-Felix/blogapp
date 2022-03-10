const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Postagem = new Schema ({
    titulo:{
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectID,
        //categoria vai armazenar um id de uma categoria
        ref: "categorias",
        //o nome dado ao model foi categorias
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("postagens", Postagem)