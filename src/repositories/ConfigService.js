const prisma = require('../services/prisma')


class ConfigService {
    async getById(id) {
        try {
            const dados = await prisma.configSistem.findUnique({ where: { id: Number(id) } })
            return { erro: false, dados }
        } catch (error) {
            console.log(error);
            return { erro: true, msg: 'Erro ao tentar exibir o registro!' }

        }

    }

    async update(payload) {
        try {
            const dados = await prisma.configSistem.update({ data: payload, where: { id: 1 } })
            return { erro: false, dados }
        } catch (error) {
            console.log('config - update - erro', error);
            return { erro: true, dados }
        }
    }
}
module.exports = new ConfigService()

