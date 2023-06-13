const { connect } = require('../services/db')
var prisma = require('../services/prisma')
var ProdutoService = require("../repositories/ProdutoService")

class ProdutoController {
    async criar(req, res) {
        try {
            console.log("aqui");
            const data = await ProdutoService.create(req.body)
            res.status(200).send(data)
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    }
    async listar(req, res) {
        try {
            const data = await ProdutoService.getAll()
            res.status(200).send(data)
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    }

    async exibir(req, res) {
        try {
            const data = await ProdutoService.getById(Number(req?.params?.id))
            res.status(200).send(data)
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    }


    async editar(req, res) {
        try {
            const id = Number(req?.params?.id)
            const payload = req.body
            const data = await ProdutoService.update(id, payload)
            res.status(200).send(data)
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    }

    async deletar(req, res) {
        try {
            const id = Number(req?.params?.id)
            const data = await ProdutoService.delete(id)
            res.status(200).send(data)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = new ProdutoController()