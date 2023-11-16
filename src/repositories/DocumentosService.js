var prisma = require('../services/prisma')
const fs = require('fs/promises')
const path = require('path')
const { promisify } = require('util')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const storage_type = process.env.LOCAL_STORAGE_TYPE

class DocumentosService {
    async criate(destinos, fileInfo) {
        try {
            if (!Object.keys(destinos).length) {
                throw new Error('Destinos não definidos!')
            }
            const dados = await prisma.documentos.create({
                data: fileInfo,
                select: { id: true }
            })
            return { erro: false, dados }
        } catch (erro) {
            this.excluirArquivo(storage_type, fileInfo.nome)
            return { erro: true, msg: 'Erro ao tentar criar o registro no banco.' }
        }
    }
    async getAll() {
        try {
            const dados = await prisma.documentos.findMany()
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }
    }
    async filtrar(filtro) {
        try {
            const dados = await prisma.documentos.findMany({ where: filtro })
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            return { erro: true, msg: 'Erro ao tentar exibir listagem no banco.' }
        }
    }

    async getById(id) {
        try {
            const dados = await prisma.documentos.findUnique({ where: { id } })
            if (!dados) return { erro: false, dados }
            return dados
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar exibir o registro do banco.' }
        }
    }
    async download(id) {
        try {
            const dados = await prisma.documentos.findUnique({ where: { id } })
            if (!dados) return { erro: true, dados }
            return dados
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar exibir o registro do banco.' }
        }
    }

    async delete(id) {
        try {
            const file = await prisma.documentos.findUnique({ where: { id } })
            if (!file.nome) {
                return { erro: true, codigo: code, msg: 'Registro não encontrado no banco.' }
            }
            const dados = await prisma.documentos.delete({ where: { id } })
            this.excluirArquivo(storage_type, file.nome)
            return { erro: false, dados }
        } catch (erro) {
            console.log(erro);
            const { code } = erro
            return { erro: true, codigo: code, msg: 'Erro ao tentar excluir o registro do banco.' }
        }
    }
    async excluirArquivo(local, filename) {
        try {
            if (storage_type === 'local')
                await fs.unlink(path.resolve(__dirname, '..', 'uploads', filename))
            return true
        } catch (error) {
            console.log(`Erro ao tentar excluir o arquivo ${filename}.`);
            return false
        }
    }
}

module.exports = new DocumentosService()