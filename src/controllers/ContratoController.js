const { PrismaClient } = require('@prisma/client')
const ContratoService = require('../repositories/UsuarioService')

class ContratoController {
    async criar(req, res) {
        try {
            const data = await ContratoService.create(req.body)
            res.status(200).send(data)
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    }

    async listar(req, res) {
        try {
            const data = await ContratoService.getAll()
            res.status(200).send(data)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async exibir(req, res) {
        try {
            const data = await ContratoService.getById(Number(req?.params?.id))
            res.status(200).send(data)
        } catch (error) {
            res.status(500).send(error)
        }
    }


    async editar(req, res) {
        try {
            const id = Number(req?.params?.id)
            const payload = req.body
            const data = await ContratoService.update(id, payload)
            res.status(200).send(data)
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    }

    async deletar(req, res) {
        try {
            const id = Number(req?.params?.id)
            const data = await ContratoService.delete(id)
            res.status(200).send(data)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = new ContratoController()