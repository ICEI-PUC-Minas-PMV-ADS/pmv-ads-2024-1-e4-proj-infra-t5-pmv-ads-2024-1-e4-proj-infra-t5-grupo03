const nodemailer = require('nodemailer');
module.exports = {


    friendlyName: 'Send email',


    description: 'Send a email with token to retrieve the password.',


    extendedDescription: 'Use nodemailer to send the email.',


    inputs: {

        token: {
            friendlyName: 'retrieveToken',
            description: 'The token to get the user',
            type: 'string',
            defaultsTo: ''
        }
    },


    exits: {

        success: {
            outputFriendlyName: 'Success on email send',
            outputDescription: 'The user get the email.',
        },

        noUsersFound: {
            description: 'Could not find any users with this token, email not send.'
        },

        emailError: {
            description: 'Could not send email to this user.'
        }

    },


    fn: async function (inputs, exits) {

        var user = await Users.findOne({
            retrieveToken: inputs.token
        })

        if (!user) {
            throw 'noUsersFound';
        }
        const transporter = nodemailer.createTransport({
            host: process.env.FROM_EMAIL_HOST,
            port: Number(process.env.FROM_EMAIL_PORT),
            secure: true,
            tls: {
                ciphers: "SSLv3",
                rejectUnauthorized: false,
            },
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        const link = (process.env.HOST_FRONT || 'localhost:3000') + '/reset/' + inputs.token
        var mailOptions = {
            from: process.env.FROM_EMAIL,
            to: user.email,
            subject: 'Recuperação de senha',
            text: `Olá ${user.nickname || 'Usuário'}, \n 
        Por favor, clique no link a seguir para redefinir sua senha.:\n
         ${link}  \n
        \n 
        Se você não solicitou isso, por favor ignore este email e sua senha não haverá mudanças.\n`,

        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                sails.log.error(err)
                throw 'emailError'
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return exits.success();

    }

};