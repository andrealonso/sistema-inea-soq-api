var prisma = require('../services/prisma')
var moment = require('moment')
class AndendaService {

    async create(req) {
        try {
            let payload = req.body

            payload.data_inicio = new Date(payload.data_inicio)
            payload.data_fim = new Date(payload.data_fim)
            payload.user_id = req.user.user_id;


            const dados = await prisma.agenda.create({
                data: payload,
                select: { id: true }
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }
    async getAll(skip, take, busca) {
        var filtro = {
            where: { deleted_at: null }
        }
        try {
            const dados = await prisma.agenda.findMany({
                ...filtro,
                include: {
                    empresas: { select: { nome: true } },
                    propriedades: {
                        select: {
                            nome: true,
                            proprietarios: { select: { nome: true } },
                            representantes: { select: { nome: true } },
                        }
                    },
                    user: { select: { nome: true } }
                },
            })

            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }

    }
    async filtrar(filtro) {
        try {
            Object.keys(filtro).forEach(key => filtro[key] === null ? delete filtro[key] : null)
            let { data_inicio, data_fim, empresas_id, propriedades_id } = filtro
            data_inicio ? data_inicio = new Date(data_inicio) : new Date(moment().startOf('month'))
            data_fim ? data_fim = new Date(data_fim) : new Date(moment().startOf('month'))
            const dados = await prisma.agenda.findMany({
                where:
                {
                    // OR: [
                    //     {
                    //         data_inicio: { lte: data_fim },
                    //         data_inicio: { gte: data_inicio }
                    //     },
                    //     {
                    //         data_fim: { lte: data_fim },
                    //         data_fim: { gte: data_inicio }
                    //     }
                    // ],

                    AND: [
                        { data_inicio: { lte: data_fim } },
                        { data_inicio: { gte: data_inicio } },
                        { empresas_id },
                        { propriedades_id }
                    ],


                },
                include: {
                    empresas: { select: { nome: true } },
                    propriedades: {
                        select: {
                            nome: true,
                            geolocal: true,
                            proprietarios: { select: { nome: true } },
                            representantes: { select: { nome: true } },
                        }
                    },
                    user: { select: { nome: true } }
                },
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }

    }
    async getById(id) {
        try {
            const [empresas, propriedades, agenda] = await prisma.$transaction([
                prisma.empresas.findMany({
                    where: { deleted_at: null },
                    select: { id: true, nome: true }
                }),
                prisma.propriedades.findMany({
                    where: { deleted_at: null },
                    select: { id: true, nome: true }
                }),
                prisma.agenda.findMany({
                    where: { AND: { id, deleted_at: null } },
                    include: {
                        empresas: { select: { nome: true } },
                        propriedades: { select: { nome: true } },
                        user: { select: { nome: true } }
                    },
                })
            ])
            moment.locale('pt-br')

            if (agenda[0]) {
                agenda[0].data_inicio = moment.utc(agenda[0].data_inicio).format('YYYY-MM-DD');
                agenda[0].data_fim = moment.utc(agenda[0].data_fim).format('YYYY-MM-DD');
            }
            const dados = { empresas, propriedades, agenda: agenda[0] }
            if (!dados) return { erro: false, dados }
            return dados
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar exibir o registro do banco.' }
        }
    }

    async update(id, payload) {
        try {
            payload.data_inicio = new Date(payload.data_inicio)
            payload.data_fim = new Date(payload.data_fim)
            // console.log(payload);
            // return { payload }
            const dados = await prisma.agenda.update({
                where: { id },
                data: payload,
                select: { id: true },
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar alterar o registro no banco.' }
        }
    }

    async delete(id) {
        try {
            const dados = await prisma.agenda.update({
                where: { id },
                data: { deleted_at: new Date() },
                select: { id: true }
            })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar excluir o registro do banco.' }
        }
    }
}

module.exports = new AndendaService()