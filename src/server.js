var express = require('express')
const morgan = require("morgan")
var app = express()
const cors = require('cors');
app.use(cors({ origin: '*' }));
const router = express.Router()
const auth = require('./middlewares/auth')

const UsuarioRoutres = require('./routers/UsuarioRouters')
const ProprietarioRouters = require('./routers/ProprietarioRouters')
const RepresentanteRouters = require('./routers/RepresentanteRouters')
const EmpresaRouters = require('./routers/EmpresaRouters')
const ProriedadeRouters = require('./routers/PropriedadeRouters')
const LoginRouters = require('./routers/LoginRouters')
const AgendaRouters = require('./routers/AgendaRouters')
const DocumentosRouters = require('./routers/DocumentosRouters')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(morgan('dev'))
app.use('/', LoginRouters)
app.use(auth)
app.use('/', DocumentosRouters)
app.use('/', ProprietarioRouters)
app.use('/', UsuarioRoutres)
app.use('/', RepresentanteRouters)
app.use('/', EmpresaRouters)
app.use('/', ProriedadeRouters)
app.use('/', AgendaRouters)

app.listen(3000, () => {
    console.log('Servidor ativo na porta 3000');
})