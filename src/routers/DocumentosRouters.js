const express = require('express')
const router = express.Router()
const DocumentosController = require('../controllers/DocumentosController')
const multer = require('multer')
const multerConf = require('../config/multer')

router.post('/documento', multer(multerConf).single('file'), DocumentosController.criar)
router.get('/documentos/filtrar', DocumentosController.filtrar)
router.get('/documentos', DocumentosController.listar)
router.get('/documento/:id', DocumentosController.exibir)
router.get('/documento/download/:id', DocumentosController.download)
router.delete('/documento/:id', DocumentosController.deletar)
// router.post('/upload', DocumentosController.criar)

module.exports = router