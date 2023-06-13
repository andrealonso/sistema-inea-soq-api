const { connect } = require('../services/db')
var prisma = require('../services/prisma')
var EnderecoService = require("../repositories/EnderecoService")

class EnderecoController {
    async criar(req, res) {
        const dados = await EnderecoService.create(req.body)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async listar(req, res) {
        const dados = await EnderecoService.getAll()
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async exibir(req, res) {
        const filtro = req.body
        const dados = await EnderecoService.getById(filtro)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }


    async editar(req, res) {
        const id = Number(req?.params?.id)
        const payload = req.body
        const dados = await EnderecoService.update(id, payload)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async deletar(req, res) {
        const id = Number(req?.params?.id)
        const dados = await EnderecoService.delete(id)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
}

module.exports = new EnderecoController()