const LogsService = require("../repositories/LogsService")

function verificarAcesso(listaUsuariosAutorizados, user) {
    // 1 - AMD ROOT
    // 2 - AMD INEA
    // 3 - AMD ADM EMPRESAS
    // 4 - FISCAIS
    // 5 - FUNCIONARIOS
    return listaUsuariosAutorizados.some(item => item == user.user_tipo_id)
}

class LogsController {
    async listar(req, res) {
        if (!verificarAcesso([1], req.user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado!' })
            return
        }
        const dados = await LogsService.listAll()
        res.send({ dados })
    }
    async limpar(req, res) {
        if (!verificarAcesso([1], req.user)) {
            res.status(401).send({ erro: true, msg: 'Acesso não autorizado!' })
        }
        const dados = await LogsService.limparLogs()
        res.send({ dados })
    }
}

module.exports = new LogsController()