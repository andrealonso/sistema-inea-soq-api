var AgendaService = require("../repositories/AgendaService")
const entidade = 'Ordem de queima'
const logs = require('../repositories/LogsService')

function verificarAcesso(listaUsuariosAutorizados, user) {
    // 1 - AMD ROOT
    // 2 - AMD INEA
    // 3 - AMD ADM EMPRESAS
    // 4 - FISCAIS
    // 5 - FUNCIONARIOS
    return listaUsuariosAutorizados.some(item => item == user.user_tipo_id)
}
function configurarFiltorPorUser(user, filtro) {
    // ADM EMPRESA ou FUNCIONARIOS
    if ((user.user_tipo_id === 3 || user.user_tipo_id === 5) && !user.parceira_inea) {
        filtro.empresas_id = user.empresas_id
        return { deleted_at: null, ...filtro }
    } else {
        return { deleted_at: null, ...filtro }
    }
}


class AgendaController {
    async criar(req, res) {
        if (!verificarAcesso([1, 3, 5], req.user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const dados = await AgendaService.create(req)
        if (!dados?.erro) {
            logs.create(req.user.user_id, entidade, dados.dados.id, 0)
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async listar(req, res) {
        if (!verificarAcesso([1], req.user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const user = req.user
        let filtro = { deleted_at: null }
        const dados = await AgendaService.getAll({ where: filtro })
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async filtrar(req, res) {
        if (!verificarAcesso([1, 2, 3, 4, 5], req.user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const filtro = configurarFiltorPorUser(req.user, req?.body)
        const dados = await AgendaService.filtrar(filtro)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
    async getFiltros(req, res) {
        if (!verificarAcesso([1, 2, 3, 4, 5], req.user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const dados = await AgendaService.getFiltros()
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async exibir(req, res) {
        if (!verificarAcesso([1, 2, 3, 4, 5], req.user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const dados = await AgendaService.getById(Number(req?.params?.id))
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async print(req, res) {
        if (!verificarAcesso([1, 2, 3, 4, 5], req.user)) {
            res.send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const dados = await AgendaService.print(Number(req?.params?.id))
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async editar(req, res) {
        if (!verificarAcesso([1, 3, 5], req.user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const id = Number(req?.params?.id)
        const payload = req.body
        const dados = await AgendaService.update(id, payload, req)
        if (!dados?.erro) {
            logs.create(req.user.user_id, entidade, dados.dados.id, 1)
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async deletar(req, res) {
        if (!verificarAcesso([1, 3, 5], req.user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const id = Number(req?.params?.id)
        const dados = await AgendaService.delete(id)
        if (!dados?.erro) {
            logs.create(req.user.user_id, entidade, dados.dados.id, 2)
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
}

module.exports = new AgendaController()