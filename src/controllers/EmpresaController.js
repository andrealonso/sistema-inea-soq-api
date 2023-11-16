const { connect } = require('../services/db')
const { PrismaClient } = require('@prisma/client')
const EmpresaService = require('../repositories/EmpresaService')

function verificarAcesso(req, res) {
    const { user } = req
    // 1 - AMD ROOT
    // 2 - AMD INEA
    // 3 - AMD ADM EMPRESAS
    // 4 - FISCAIS
    // 5 - FUNCIONARIOS
    const listaUsuariosAutorizados = [1, 2, 3, 5]
    if (!listaUsuariosAutorizados.some(item => item == user.user_tipo_id)) {
        res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
        return false
    }
    return true
}

class EmpresaController {
    async criar(req, res) {
        verificarAcesso(req, res)
        const dados = await EmpresaService.create(req.body)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async listar(req, res) {
        if (!verificarAcesso(req, res)) return
        const dados = await EmpresaService.getAll()
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
    async filtrar(req, res) {
        if (!verificarAcesso(req, res)) return


    }

    async exibir(req, res) {
        verificarAcesso(req, res)
        const dados = await EmpresaService.getById(Number(req?.params?.id))
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }


    async editar(req, res) {
        verificarAcesso(req, res)
        const id = Number(req?.params?.id)
        const payload = req.body
        const dados = await EmpresaService.update(id, payload)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async deletar(req, res) {
        verificarAcesso(req, res)
        const id = Number(req?.params?.id)
        const dados = await EmpresaService.delete(id)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
}

module.exports = new EmpresaController()