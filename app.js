//carregando modulos
    const express = require("express")
    const handlebars = require("express-handlebars")
    const bodyParser = require("body-parser")
    const app = express()
    const admin = require("./routes/admin")
    const path = require("path")
    //path é um modulo padrao do node, para trabalhar diretorios, manipular pastas
    const mongoose = require("mongoose")
    const session = require("express-session")
    const flash = require("connect-flash")
    require("./models/Postagem")
    const Postagem = mongoose.model("postagens")
    
//configurações
   //Sessão
   app.use(session({
       secret:"cursodenode",
       resave: true,
       saveUninitialized: true
   }))
   //flash
   app.use(flash())
   //middleware
   app.use((req,res,next) => {
       res.locals.success_msg = req.flash("success_msg")
       res.locals.error_msg = req.flash("error_msg")
       next()
       //variaveis globais que podem ser acessadas em qlqr lugar da aplicação
   })
   //body-parser 
   app.use(bodyParser.urlencoded({extended: true}))
   app.use(bodyParser.json())
   //handlebars 
   app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
   app.set('view engine', 'handlebars');
   //Mongoose
   mongoose.Promise = global.Promise;
   mongoose.connect("mongodb://localhost/blogapp").then(() =>{
       console.log("Conectado ao mongo")
   }).catch((err) => {
       console.log("Erro ao se conectar: "+err)
   })
   // Public
   app.use(express.static(path.join(__dirname, "public")))

   //rotas
   app.use('/admin', admin)
   //     '/admin' é o prefixo para todas as rotas de admin
   // se quiser uma rota sem prefixo, ela tem que estar aqui
   app.get('/',(req,res) => {
       Postagem.find().lean().populate("categoria").sort({data:"desc"}).then((postagens) => {
           res.render("index", {postagens: postagens})
       }).catch((err) => {
           req.flash("error_msg","Houve um erro interno")
           req.redirect("/404")
       })
   })

   app.get("/postagem/:slug", (req,res) => {
       Postagem.findOne({slug: req.params.slug}).then((postagem) => {
           if(postagem){
                res.render("postagem/index", {postagem: postagem})
           }else {
                req.flash("error_msg", "Esta postagem não existe")
                req.redirect("/")
            }
       }).catch((err) => {
           req.flash("error_msg", "Houve um erro interno")
           res.redirect("/")
       })
   })

   app.get("/404" ,(req,res) => {
       res.send("Erro 404!")
   })

   app.get('/posts', (req,res) => {
       res.send('Lista Posts')
   })
//outros
const Port = 8084
app.listen(Port, () => {
    console.log("servidor rodando")
})

