const { connect } = require('../services/db')
var prisma = require('../services/prisma')
var PessoaService = require("../repositories/PessoaService")


class PessoaController {
    async criar(req, res) {
        const dados = await PessoaService.create(req.body)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async listar(req, res) {
        const skip = Number(req?.query?.skip) || 0
        const take = Number(req?.query?.take) || 100
        const busca = req?.query?.busca || ""
        const tipoId = Number(req?.query?.tipo) || 1
        const dados = await PessoaService.getAll(tipoId, skip, take, busca)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async exibir(req, res) {
        const dados = await PessoaService.getById(Number(req?.params?.id))
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async editar(req, res) {
        const id = Number(req?.params?.id)
        const payload = req.body
        const dados = await PessoaService.update(id, payload)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async deletar(req, res) {
        const id = Number(req?.params?.id)
        const dados = await PessoaService.delete(id)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
}

module.exports = new PessoaController()