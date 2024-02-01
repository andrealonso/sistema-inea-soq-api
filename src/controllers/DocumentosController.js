const DocumentosService = require('../repositories/DocumentosService')
const DosumentoService = require('../repositories/DocumentosService')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const storage_type = process.env.LOCAL_STORAGE_TYPE

function definirBusca(payload) {
    let { representantes_id, proprietarios_id, propriedades_id, agenda_id, denuncia_id } = payload
    let obj = {}
    representantes_id ? obj.representantes_id = Number(representantes_id) : null
    propriedades_id ? obj.propriedades_id = Number(propriedades_id) : null
    proprietarios_id ? obj.proprietarios_id = Number(proprietarios_id) : null
    agenda_id ? obj.agenda_id = Number(agenda_id) : null
    denuncia_id ? obj.denuncia_id = Number(denuncia_id) : null
    return obj
}
class DocumentosController {
    async criar(req, res) {
        if (req.file) {
            const destinoDocs = definirBusca(req.body)
            const { filename, ext } = req.file
            const { descricao } = req.body
            const dados = await DosumentoService.criate(destinoDocs, {
                ...destinoDocs, descricao, nome: filename, ext
            })
            if (!dados?.erro) {
                res.status(200).send(dados)
            } else {
                res.status(400).send(dados)
            }
        }
    }

    async listar(req, res) {
        const dados = await DocumentosService.getAll()
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async filtrar(req, res) {
        const filtro = definirBusca(req.query)
        const dados = await DocumentosService.filtrar(filtro)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async exibir(req, res) {
        const dados = await DocumentosService.getById(Number(req?.params?.id))
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
    async download(req, res) {
        const dados = await DocumentosService.download(Number(req?.params?.id))
        if (!dados.erro) {
            res.status(200).download(path.resolve(__dirname, '..', 'uploads', dados.nome))
        } else {
            res.status(400).send({ erro: true, msg: 'Registro ou arquivo não encontrado.' })
        }
    }

    async editar(req, res) {
        const id = Number(req?.params?.id)
        const payload = req.body
        const dados = await DocumentosService.update(id, payload)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }

    async deletar(req, res) {
        const id = Number(req?.params?.id)
        const dados = await DocumentosService.delete(id)
        if (!dados?.erro) {
            res.status(200).send(dados)
        } else {
            res.status(400).send(dados)
        }
    }
}

module.exports = new DocumentosController()