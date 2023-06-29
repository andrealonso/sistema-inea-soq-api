const { connect } = require('../services/db')
var prisma = require('../services/prisma')
var RepresentanteService = require("../repositories/RepresentanteService")


class ProprietarioController {
    async criar(req, res) {
        const dados = await RepresentanteService.create(req.body)
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
        const tipo = Number(req?.query?.tipo) || 1
        const dados = await RepresentanteService.getAll(skip, take, busca)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async exibir(req, res) {
        const dados = await RepresentanteService.getById(Number(req?.params?.id))
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async editar(req, res) {
        const id = Number(req?.params?.id)
        const payload = req.body
        const dados = await RepresentanteService.update(id, payload)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async deletar(req, res) {
        const id = Number(req?.params?.id)
        const dados = await RepresentanteService.delete(id)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
}

module.exports = new ProprietarioController()