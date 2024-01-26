const { connect } = require('../services/db')
var prisma = require('../services/prisma')
var RepresentanteService = require("../repositories/RepresentanteService")
const logs = require('../repositories/LogsService')
const entidade = 'Representantes'

function verificarAcesso(listaUsuariosAutorizados, user) {
    // 1 - AMD ROOT
    // 2 - AMD INEA
    // 3 - AMD ADM EMPRESAS
    // 4 - FISCAIS
    // 5 - FUNCIONARIOS
    return listaUsuariosAutorizados.some(item => item == user.user_tipo_id)
}

class ProprietarioController {
    async criar(req, res) {
        const user = req.user
        if (!verificarAcesso([1, 2, 3, 5], user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const dados = await RepresentanteService.create(req.body)
        if (!dados?.erro) {
            logs.create(user.user_id, entidade, dados.dados.id, 0)
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async listar(req, res) {
        const user = req.user
        if (!verificarAcesso([1, 2, 3, 5], user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const skip = Number(req?.query?.skip) || 0
        const take = Number(req?.query?.take) || 100
        const busca = req?.query?.busca || ""
        const tipo = Number(req?.query?.tipo) || 1
        const dados = await RepresentanteService.getAll(skip, take, busca)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async exibir(req, res) {
        const user = req.user
        if (!verificarAcesso([1, 2, 3, 5], user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const dados = await RepresentanteService.getById(Number(req?.params?.id))
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async editar(req, res) {
        const user = req.user
        if (!verificarAcesso([1, 2, 3, 5], user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const id = Number(req?.params?.id)
        const payload = req.body
        const dados = await RepresentanteService.update(id, payload)
        if (!dados?.erro) {
            logs.create(user.user_id, entidade, dados.dados.id, 1)
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async deletar(req, res) {
        const user = req.user
        if (!verificarAcesso([1, 2, 3, 5], user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const id = Number(req?.params?.id)
        const dados = await RepresentanteService.delete(id)
        if (!dados?.erro) {
            logs.create(user.user_id, entidade, dados.dados.id, 2)
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
}

module.exports = new ProprietarioController()