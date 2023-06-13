var prisma = require('../services/prisma')
class ProdutoService {
    async create(payload) {
        const data = await prisma.produto.create({ data: payload, select: { id: true } })
        return data
    }
    async getAll(tipoId, skip, take, busca) {
        var filtro = {
            where: {
                deleted_at: null,
                descricao: {
                    contains: busca
                }
            }
        }
        const [qtdRegistros, registros] = await prisma.$transaction([

            prisma.produto.count({ ...filtro }),
            prisma.produto.findMany({
                ...filtro,
                select: {
                    id: true,
                    cod_barras: true,
                    descricao: true,
                    prod_cor: true,
                    qtd_estoque: true,
                    vl_aluguel: true,
                    prod_tamanho: true

                },
                orderBy: { descricao: "asc" },
                skip,
                take
            }),
        ])

        const qtdPaginas = Math.ceil(qtdRegistros / take)
        const dados = { qtdRegistros, qtdPaginas, registros }
        return dados
    }
    async getById(id) {
        const selDescricao = { select: { descricao: true } }
        const [produto, cores, tamanhos, comprimentos, fabricas, categorias] = await prisma.$transaction([
            prisma.produto.findUnique({ where: { id } }),
            prisma.prod_cor.findMany(),
            prisma.prod_tamanho.findMany(),
            prisma.prod_compri.findMany(),
            prisma.prod_fabrica.findMany(),
            prisma.prod_categoria.findMany()

        ])
        const dados = { produto, cores, tamanhos, comprimentos, fabricas, categorias }
        return dados
    }
    async update(id, payload) {
        const dados = await prisma.produto.update({ where: { id }, data: payload, select: { id: true } })
        return dados
    }
    async delete(id) {
        const dados = await prisma.produto.delete({ where: { id }, select: { id: true } })
        return dados
    }
}

module.exports = new ProdutoService()