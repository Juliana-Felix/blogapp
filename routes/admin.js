const express = require("express")
const router = express.Router()
               //criar rotas em arquivos separados

router.get('/', (req,res) => {
    res.render("admin/index")
})

router.get('/posts', (req,res) => {
    res.send("Página de posts")
})

router.get('/categorias',(req,res) => {
    res.send("Página de categorias")
})

//router ao inves de app, pois estar em um arquivo separado do principal

module.exports = router 
// exportar no final da pag