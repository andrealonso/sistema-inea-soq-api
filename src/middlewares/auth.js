const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_SECRET

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
    jwt.verify(token, jwt_secret, (err, decoded) => {
        if (err) return res.status(401).send({ erro: true, msg: 'Token inválido!' })
        req.user = {
            nome: decoded.nome,
            user_id: Number(decoded.user_id),
            user_tipo_id: Number(decoded.user_tipo_id),
            empresas_id: Number(decoded.empresas_id),
            parceira_inea: decoded.parceira_inea,
            token: header
        }
        return next()
    })

}