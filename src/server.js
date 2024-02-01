var dotenv = require('dotenv')
dotenv.config()
var express = require('express')
const morgan = require("morgan")
var app = express()
const cors = require('cors');
app.use(cors({ origin: '*' }));
const router = express.Router()
const auth = require('./middlewares/auth')

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
app.use('/', LoginRouters)
app.use(auth)
app.use('/', DenunciaRouters)
app.use('/', ProriedadeRouters)
app.use('/', DocumentosRouters)
app.use('/', ProprietarioRouters)
app.use('/', UsuarioRoutres)
app.use('/', RepresentanteRouters)
app.use('/', EmpresaRouters)
app.use('/', AgendaRouters)
app.use('/', LogsRouters)
app.use('/', ConfigRouters)

app.listen(3000, () => {
    console.log('Servidor ativo na porta 3000');
})