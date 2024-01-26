const { connect } = require('../services/db')
const { PrismaClient } = require('@prisma/client')
const UserService = require('../repositories/UsuarioService')
const logs = require('../repositories/LogsService')
const entidade = 'Usuários'
function verificarAcesso(listaUsuariosAutorizados, user) {
    // 1 - AMD ROOT
    // 2 - AMD INEA
    // 3 - AMD ADM EMPRESAS
    // 4 - FISCAIS
    // 5 - FUNCIONARIOS
    return listaUsuariosAutorizados.some(item => item == user.user_tipo_id)
}

class UsuarioController {
    async criar(req, res) {
        const user = req.user
        if (!verificarAcesso([1, 2, 3], user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const dados = await UserService.create(req.body)
        if (!dados?.erro) {
            logs.create(user.user_id, entidade, dados.dados.id, 0)
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async listar(req, res) {
        const user = req.user
        if (!verificarAcesso([1, 2, 3], user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        let filtro
        let dados
        //ADM ROOT
        if (user.user_tipo_id === 1) {
            dados = await UserService.getAll()
        } else {
            // ADM FISCAL
            if (user.user_tipo_id === 2) {
                filtro = {
                    user_tipo_id: { in: [2, 3, 4] },
                    empresas_id: null
                }
            }

            // ADM EMPRESA
            if (user.user_tipo_id === 3 && !user.parceira_inea) {
                filtro = {
                    user_tipo_id: { in: [3, 5] },
                    empresas_id: user.empresas_id
                }
            }

            // ADM EMPRESA PARCEIRA
            if (user.user_tipo_id === 3 && user.parceira_inea) {
                filtro = {
                    user_tipo_id: { in: [3, 5] },
                    empresas_id: user.empresas_id
                }
            }

            dados = await UserService.filtrar(filtro)
        }

        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
    async filtrar(req, res) {
        const user = req.user
        if (!verificarAcesso([1, 2, 3], user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const filtro = req.body
        const dados = await UserService.filtrar(filtro)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async exibir(req, res) {
        const user = req.user
        if (!verificarAcesso([1, 2, 3], user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const dados = await UserService.getById(Number(req?.params?.id))
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }


    async editar(req, res) {
        const user = req.user
        if (!verificarAcesso([1, 2, 3], user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const id = Number(req?.params?.id)
        const payload = req.body
        const dados = await UserService.update(id, payload)
        if (!dados?.erro) {
            logs.create(user.user_id, entidade, dados.dados.id, 1)
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async deletar(req, res) {
        const user = req.user
        if (!verificarAcesso([1, 2, 3], user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado' })
            return
        }
        const id = Number(req?.params?.id)
        const dados = await UserService.delete(id)
        if (!dados?.erro) {
            logs.create(user.user_id, entidade, dados.dados.id, 2)
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
}

module.exports = new UsuarioController()