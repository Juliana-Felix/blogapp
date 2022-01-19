//carregando modulos
    const express = require("express")
    const handlebars = require("express-handlebars")
    const bodyParser = require("body-parser")
    const app = express()
    const admin = require("./routes/admin")
    const path = require("path")
    //path é um modulo padrao do node, para trabalhar diretorios, manipular pastas
  //const mongoose = require("mongoose")
  //public
   app.use(express.static(path.join(__dirname, "public")))
//configurações
   //body-parser e handlebars
   app.use(bodyParser.urlencoded({extended: true}))
   app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
   app.set('view engine', 'handlebars');
//rotas
   app.use('/admin', admin)
   //     '/admin' é o prefixo para todas as rotas de admin
   // se quiser uma rota sem prefixo, ela tem que estar aqui
   app.get('/',(req,res) => {
       res.send('Rota principal')
   })
   app.get('/posts', (req,res) => {
       res.send('Lista Posts')
   })
//outros
const Port = 8084
app.listen(Port, () => {
    console.log("servidor rodando")
})

