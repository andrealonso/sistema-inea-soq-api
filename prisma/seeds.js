var dotenv = require('dotenv')
dotenv.config()
const prisma = require("../src/services/prisma")
var bcrypt = require('bcryptjs')

var tabelasOk = []
var tabelasErro = []

prisma.ativo_status
const seeds = {
    user_tipo: [
        { id: 1, descricao: "ADM ROOT" },
        { id: 2, descricao: "ADM INEA" },
        { id: 3, descricao: "ADM EMPRESA" },
        { id: 4, descricao: "FISCAL INEA" },
        { id: 5, descricao: "FUNCIONÁRIO" }
    ],
    ativo_status: [
        { id: 1, descricao: "ATIVO" },
        { id: 2, descricao: "INATIVO" }
    ],
    agenda_Status: [
        { id: 1, descricao: 'Queima agendada' },
        { id: 2, descricao: 'Queima realizada' },
        { id: 3, descricao: 'Queima não programada' },
        { id: 4, descricao: 'Queima cancelada' },
    ],


}


async function main() {
    // Excluir logs
    await prisma.logs.deleteMany()

    // Aplicar SEEDS
    async function aplicarSeeds(tabela) {
        try {
            await prisma[tabela].deleteMany()
            await prisma[tabela].createMany({
                data: seeds[tabela]
            })
            tabelasOk.push(tabela)
        } catch (error) {
            console.log(error);
            tabelasErro.push(tabela)
        }
    }

    // Ativar usuário Root
    async function ativarRoot() {
        try {
            const senha = await bcrypt.hash(process.env.ROOT_SENHA, 10)
            await prisma.user.deleteMany()
            await prisma.user.create({
                data: {
                    id: 1,
                    nome: 'Root - SOQ',
                    cpf: '00000000',
                    tel: '00000000',
                    login: process.env.ROOT_LOGIN,
                    senha,
                    user_tipo_id: 1,
                    ativo_status_id: 1
                }
            })
            console.log("Usuário root ativado.");
        } catch (error) {
            console.log("Usuário root erro:", error);
        }
    }

    // Aplicar todas as tabelas
    const promises = Object.keys(seeds).map(async (iten) => await aplicarSeeds(`${iten}`))
    await Promise.all(promises)
    await ativarRoot()

    // Aplicar apenas uma tabela
    // aplicarSeeds(`caixa_cate`)

    console.log("Tabelas criadas: " + tabelasOk)
    console.log("Tabelas com erro: " + tabelasErro)

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })