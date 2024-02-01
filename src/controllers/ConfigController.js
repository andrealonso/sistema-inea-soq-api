const ConfigService = require('../repositories/ConfigService')
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

class ConfigController {
    async exibir(req, res) {
        const { id } = req.params
        const dados = await ConfigService.getById(id)
        res.send(dados)
    }

    async editar(req, res) {
        const payload = req.body
        const dados = await ConfigService.update(payload)
        res.send(dados)
    }

}
module.exports = new ConfigController()