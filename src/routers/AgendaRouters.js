const express = require('express')
const router = express.Router()
const AgendaController = require('../controllers/AgendaController')

router.get('/agendamentos', AgendaController.listar)
router.get('/agendamentos/getfiltros', AgendaController.getFiltros)
router.get('/agendamento/:id', AgendaController.exibir)
router.get('/agendamento/print/:id', AgendaController.print)
router.post('/agendamento', AgendaController.criar)
router.post('/agendamentos/filtrar', AgendaController.filtrar)
router.put('/agendamento/:id', AgendaController.editar)
router.delete('/agendamento/:id', AgendaController.deletar)

module.exports = router