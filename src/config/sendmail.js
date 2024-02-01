const nodemailer = require('nodemailer')
var prisma = require('../services/prisma')
var moment = require('moment')
const user = process.env.MAIL_USER

class SendMail {
    async enviar_email(userId, titulo, html) {
        try {
            const { mail_user, mail_pass, mail_smtp, mail_port, mail_ssl, mail_from, ativar_envio } = await prisma.configSistem.findUnique({
                where: { id: 1 }
            })

            if (!ativar_envio) {
                return
            }

            const trasnporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: mail_user,
                    pass: mail_pass
                }
            })
            const listaEmailFiscais = await prisma.user.findMany({
                where: { user_tipo_id: { in: [2, 4] } },
                select: { login: true }
            })
            const listaUsuariosTo = await prisma.user.findMany({
                where: { id: userId },
                select: { login: true }
            })

            let CC = listaEmailFiscais.map(item => item.login).join(', ')
            let TO = listaUsuariosTo.map(item => item.login).join(', ')

            trasnporter.sendMail({
                from: `SOQ - INEA <${mail_from}>`,
                to: TO,
                cc: CC,
                subject: titulo || 'Email padrão do sistema SOQ-INEA',
                html: html || '<h3>Esta é uma menssagem padrão!'
            }).then(resp => {
                console.log('Email enviado com sucesso!');
            }).catch(e => {
                console.log('Erro', e);
            })
        } catch (error) {
            console.log('Erro geral', error);
        }

    }
}

module.exports = new SendMail()