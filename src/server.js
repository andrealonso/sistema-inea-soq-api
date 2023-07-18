var express = require('express')
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

app.use(express.json())


app.use('/', LoginRouters)
app.use(auth)
app.use('/', ProprietarioRouters)
app.use('/', UsuarioRoutres)
app.use('/', RepresentanteRouters)
app.use('/', EmpresaRouters)
app.use('/', ProriedadeRouters)
app.use('/', AgendaRouters)

app.listen(3000, () => {
    console.log('Servidor ativo na porta 3000');
})