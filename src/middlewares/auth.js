const jwt = require('jsonwebtoken')
const config = require('../config/auth')

module.exports = (req, res, next) => {
    const header = req.headers.authorization
    if (!header)
        return res.status(401).send({ erro: true, msg: 'Token inexistente' })

    const parts = header.split(' ')
    if (parts.length !== 2)
        return res.status(401).send({ erro: true, msg: 'Token error' })

    const [scheme, token] = parts
    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ erro: true, msg: 'Token error' })

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) return res.status(401).send({ erro: true, msg: 'Token inválido!' })
        req.user_id = decoded.user_id
        req.user_tipo_id = decoded.user_tipo_id
        req.parceira_inea = decoded.parceira_inea
        return next()
    })

}