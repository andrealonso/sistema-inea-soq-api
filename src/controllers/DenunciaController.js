const { connect } = require('../services/db')
const { PrismaClient } = require('@prisma/client')
const DenunciaService = require('../repositories/DenunciaService')
function verificarAcesso(user) {
    // 1 - AMD ROOT
    // 2 - AMD INEA
    // 3 - AMD ADM EMPRESAS
    // 4 - FISCAIS
    // 5 - FUNCIONARIOS
    const listaUsuariosAutorizados = [1, 3, 5]
    return listaUsuariosAutorizados.some(item => item == user.user_tipo_id)
}
class DenunciaController {
    async criar(req, res) {
        const user = req.user
        if (!verificarAcesso(user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        req.body.user_id = user.user_id
        const dados = await DenunciaService.create(req.body)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async listar(req, res) {
        const user = req.user
        if (!verificarAcesso(user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const dados = await DenunciaService.getAll()
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async exibir(req, res) {
        const user = req.user
        if (!verificarAcesso(user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const dados = await DenunciaService.getById(Number(req?.params?.id))
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
    async filtrar(req, res) {
        const filtro = req.query
        filtro.agenda_id = Number(filtro.agenda_id)
        const dados = await DenunciaService.filtrar(filtro)

        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async editar(req, res) {
        const user = req.user
        if (!verificarAcesso(user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const id = Number(req?.params?.id)
        const payload = req.body
        const dados = await DenunciaService.update(id, payload)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async deletar(req, res) {
        const user = req.user
        if (!verificarAcesso(user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const id = Number(req?.params?.id)
        const dados = await DenunciaService.delete(id)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
}

module.exports = new DenunciaController()