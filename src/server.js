var dotenv = require('dotenv')
dotenv.config()
var express = require('express')
const morgan = require("morgan")
var app = express()
const cors = require('cors');
app.use(cors({ origin: '*' }));
const router = express.Router()
const auth = require('./middlewares/auth')
const prisma = require('./services/prisma')

async function testeDB() {
    try {
        await prisma.configSistem.findFirst({ where: { id: 1 } })
        console.log('Conexão com o banco realizada com sucesso!');
    } catch (error) {
        console.log('Erro ao acessar o banco de dados!');
        console.log(error);
    }
}
testeDB()

const DenunciaRouters = require('./routers/DenunciaRouters')
const ProriedadeRouters = require('./routers/PropriedadeRouters')
const UsuarioRoutres = require('./routers/UsuarioRouters')
const ProprietarioRouters = require('./routers/ProprietarioRouters')
const RepresentanteRouters = require('./routers/RepresentanteRouters')
const EmpresaRouters = require('./routers/EmpresaRouters')
const LoginRouters = require('./routers/LoginRouters')
const AgendaRouters = require('./routers/AgendaRouters')
const DocumentosRouters = require('./routers/DocumentosRouters')
const LogsRouters = require('./routers/LogsRouters')
const ConfigRouters = require('./routers/ConfigRouters')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', LoginRouters)
app.use(auth)
app.use('/api', DenunciaRouters)
app.use('/api', ProriedadeRouters)
app.use('/api', DocumentosRouters)
app.use('/api', ProprietarioRouters)
app.use('/api', UsuarioRoutres)
app.use('/api', RepresentanteRouters)
app.use('/api', EmpresaRouters)
app.use('/api', AgendaRouters)
app.use('/api', LogsRouters)
app.use('/api', ConfigRouters)

app.listen(3000, () => {
    console.log('Servidor ativo na porta 3000');
})