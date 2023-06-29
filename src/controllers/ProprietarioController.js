const { connect } = require('../services/db')
var prisma = require('../services/prisma')
var ProprietarioService = require("../repositories/ProprietarioService")

function usuariosAutorizados(user_tipo_id) {
    // 1 - AMD ROOT
    // 2 - AMD INEA
    // 3 - AMD ADM EMPRESAS
    // 4 - FISCAIS
    // 5 - FUNCIONARIOS
    const lista = [1, 2, 3, 4, 5]
    return lista.some(item => item == user_tipo_id)

}

class ProprietarioController {

    async criar(req, res) {
        const dados = await ProprietarioService.create(req.body)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async listar(req, res) {
        if (!usuariosAutorizados(req.user_tipo_id)) {
            res.status(401).send({ erro: true, msg: 'Função não autorizada!' })
            return
        }
        const skip = Number(req?.query?.skip) || 0
        const take = Number(req?.query?.take) || 100
        const busca = req?.query?.busca || ""

        const dados = await ProprietarioService.getAll(skip, take, busca)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async exibir(req, res) {
        if (!usuariosAutorizados(req.user_tipo_id)) {
            res.status(401).send({ erro: true, msg: 'Função não autorizada!' })
            return
        }
        const dados = await ProprietarioService.getById(Number(req?.params?.id))
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async editar(req, res) {
        if (!usuariosAutorizados(req.user_tipo_id)) {
            res.status(401).send({ erro: true, msg: 'Função não autorizada!' })
            return
        }
        const id = Number(req?.params?.id)
        const payload = req.body
        const dados = await ProprietarioService.update(id, payload)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async deletar(req, res) {
        if (!usuariosAutorizados(req.user_tipo_id)) {
            res.status(401).send({ erro: true, msg: 'Função não autorizada!' })
            return
        }
        const id = Number(req?.params?.id)
        const dados = await ProprietarioService.delete(id)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
}

module.exports = new ProprietarioController()