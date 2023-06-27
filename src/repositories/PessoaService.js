var prisma = require('../services/prisma')
var moment = require('moment')
var bcrypt = require('bcryptjs')
class PessoaService {
    formatData(data) {
        if (!data) return null
        if (moment(data, 'YYYY-MM-DD', true).isValid())
            return moment(data).format('YYYY-MM-DD')
    }

    pausaTeste(tempo) {
        return new Promise((resolve) => {
            setTimeout(resolve, tempo)
        })
    }

    async encrypSenha(senha) {
        const hash = await bcrypt.hash(senha, 10)
        return hash
    }

    async create(payload) {
        // console.log(payload);
        // return {}
        const { usuario, enderecos, empresas } = payload
        delete payload.usuario
        delete payload.empresas
        delete payload.enderecos
        var data = { ...payload }
        if (usuario)
            data = { ...data, usuario: { create: usuario } }
        if (empresas)
            data = { ...data, empresas: { create: empresas } }
        if (enderecos)
            data = { ...data, enderecos: { create: enderecos } }

        try {
            const dados = await prisma.pessoas.create({
                data,
                select: { id: true }
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }


    async getAll(tipo, skip, take, busca) {
        // await this.pausaTeste(0)

        var filtro = {
            where: {
                AND: {
                    deleted_at: null,
                    pessoas_tipo_id: tipo
                }
            }
        }
        try {
            const [qtdRegistros, registros] = await prisma.$transaction([
                prisma.pessoas.count({ ...filtro }),
                prisma.pessoas.findMany({
                    ...filtro,
                    include: {
                        enderecos: { select: { cep: true } },
                        usuario: { select: { login: true, ativo_status_id: true } },
                        empresas: { select: { nome: true } },
                        propriedades_donos: { select: { dono: true } },
                        propriedades_repre: { select: { repre: true } },
                    },
                    orderBy: { nome: "asc" },
                    skip,
                    take
                }),
            ])
            const qtdPaginas = Math.ceil(qtdRegistros / take)
            const dados = { qtdRegistros, qtdPaginas, dados: registros }
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }

    }
    async getById(id) {
        try {
            const dados = await prisma.pessoas.findUnique({
                where: { id },
                include: {
                    enderecos: true,
                    usuario: { select: { id: true, login: true, pessoas_tipo_id: true, ativo_status_id: true } },
                    empresas: true
                }
            })
            if (!dados) return { erro: false, dados }
            return dados
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar exibir o registro no banco.' }
        }
    }

    async update(id, payload) {
        try {
            var data = {}
            const { usuario, enderecos, empresa } = payload
            delete payload.usuario
            delete payload.empresas
            delete payload.enderecos
            delete payload.id
            if (usuario)
                data = { ...payload, enderecos: { update: { where: { id: usuario.id }, data: usuario } } }
            if (enderecos)
                data = { ...payload, enderecos: { update: { where: { id: enderecos.id }, data: enderecos } } }
            const dados = await prisma.pessoas.update({
                where: { id },
                data,
                select: { id: true }
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar atualizar o registro no banco.' }
        }
    }

    async delete(id) {
        try {
            const dados = await prisma.pessoas.update({ where: { id }, data: { deleted_at: new Date() }, select: { id: true } })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar excluir o registro!' }
        }
    }
}

module.exports = new PessoaService()