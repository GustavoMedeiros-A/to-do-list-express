const express = require('express')
const path = require('path') //Serve para encontrar qual caminho você está no APP
// Ajuda a dizer para o express qual pasta as VIEWS vao estar

const checkListRouter = require('./src/routes/checklist')
const taskRouter = require('./src/routes/task')

const rootRouter = require('./src/routes/index')
const methodOverride = require("method-override")

require('./config/database')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true})) //Middleware que pega os valores do form e deixa disponivel
app.use(methodOverride('_method', {methods: ["POST", "GET"]}))

app.use(express.static(path.join(__dirname, 'public'))) // Arquivos estáticos vao ficar na pasta Public
// Arquivos estáticos (como bulma) vao retornar sempre a mesma coisa

app.set('views', path.join(__dirname, 'src/views')) //Seta os caminhos da VIEWS, dizendo qual o diretorio atual e qual o diretorio das VIEWS
app.set('view engine', 'ejs') // Diz por express que a VIEW ENGINE é o EJS

app.use('/', rootRouter) // Incluir a rota
app.use('/checklists', checkListRouter);
app.use('/checklists', taskRouter.checklistDepedent);
app.use('/tasks', taskRouter.simple)

app.listen(3000, () => {
    console.log("listening on http://localhost:3000")
})