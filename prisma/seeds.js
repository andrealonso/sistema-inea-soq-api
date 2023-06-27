const prisma = require("../src/services/prisma")

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
    ]

}

async function main() {
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

    // Aplicar todas as tabelas
    Object.keys(seeds).forEach(async (iten) => await aplicarSeeds(`${iten}`))

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