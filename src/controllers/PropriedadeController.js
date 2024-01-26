const { connect } = require('../services/db')
const { PrismaClient } = require('@prisma/client')
const PropriedadeService = require('../repositories/PropriedadeService')
const logs = require('../repositories/LogsService')
const entidade = 'Propriedades'


function verificarAcesso(listaUsuariosAutorizados, user) {
    // 1 - AMD ROOT
    // 2 - AMD INEA
    // 3 - AMD ADM EMPRESAS
    // 4 - FISCAIS
    // 5 - FUNCIONARIOS
    return listaUsuariosAutorizados.some(item => item == user.user_tipo_id)
}

class PropriedadeController {
    async criar(req, res) {
        const user = req.user
        if (!verificarAcesso([1, 2, 3, 5], user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const dados = await PropriedadeService.create(req.body, req.user)
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
        const dados = await PropriedadeService.getAll()
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
        const dados = await PropriedadeService.getById(Number(req?.params?.id))
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
        const dados = await PropriedadeService.update(id, payload, user.user_id)
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
        const dados = await PropriedadeService.delete(id)
        if (!dados?.erro) {
            logs.create(user.user_id, entidade, dados.dados.id, 2)
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
}

module.exports = new PropriedadeController()