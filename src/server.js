var express = require('express')
var app = express()
const cors = require('cors');
app.use(cors({ origin: '*' }));

const UsuarioRoutres = require('./routers/UsuarioRouters')
const PessoaRouters = require('./routers/PessoaRouters')
const EnderecoRouters = require('./routers/EnderecoRouters')
const EmpresaRouters = require('./routers/EmpresaRouters')
const ProriedadeRouters = require('./routers/PropriedadeRouters')
const LoginRouters = require('./routers/LoginRouters')

app.use(express.json())

app.use('/', LoginRouters)
app.use('/', UsuarioRoutres)
app.use('/', PessoaRouters)
app.use('/', EnderecoRouters)
app.use('/', EmpresaRouters)
app.use('/', ProriedadeRouters)

app.listen(3000, () => {
    console.log('Servidor ativo na porta 3000');
})