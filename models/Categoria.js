const mongoose = require("mongoose")
const schema = mongoose.Schema

const Categoria = new schema({
    //so nome  e slug
    nome: {
        type: String,
        required: true
    },
    slug: {
        //url da categoria especifica
        type: String,
        required: true 
    },
    date: {
        type: Date,
        default: Date.now()
        //default caso o usuario nao insira
    }
})

mongoose.model("categorias", Categoria)