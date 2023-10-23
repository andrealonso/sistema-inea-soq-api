const multer = require('multer')
const path = require('path')

module.exports = {
    dest: path.resolve(__dirname, '..', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'uploads'))
        },
        filename: (req, file, cb) => {
            file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
            const ext = path.extname(file.originalname)
            file.ext = ext
            const arquivo = file.originalname.split(' ').join('_')
            // const nome = file.originalname.slice
            const nomedoArquivo = `${Date.now()}-${arquivo}`
            cb(null, nomedoArquivo)
        }
    }),

    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const tipoPermitidos = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/jpg',
            'image/png'
            // 'image/pdf',
            // 'image/doc',
            // 'image/pdf',
            // 'image/pdf',
            // 'image/pdf',
        ]
        // console.log(file.mimetype);
        // cb(null, true)
        if (tipoPermitidos.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Tipo inválido!'))
        }

    }
}