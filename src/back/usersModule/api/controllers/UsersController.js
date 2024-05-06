const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
dotenv.config();


module.exports = {
    create: async function (req, res) {
        try {
            const user = await Users.findOne({ email: req.body.email });
            if (user) {
                sails.log.error('Usuário já cadastrado');
                return res.status(401).json({ message: 'E-mail já cadastrado!' });
            }
            const passwordHash = await bcrypt.hash(req.body.password, 10);
            const newUser = await Users.create({
                nickname: req.body.nickname,
                password: passwordHash,
                nintendo_account: req.body.nintendo_account,
                steam_account: req.body.steam_account,
                epic_account: req.body.epic_account,
                microsoft_account: req.body.microsoft_account,
                email: req.body.email,
                retriveToken: req.body.retriveToken,
                role: req.body.role || 'user'
            }).fetch();
            return res.json(newUser);
        } catch (err) {
            return res.serverError(err);
        }
    },
    login: async function (req, res) {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email });
            if (!user) {
                sails.log.error('Usuário inexistente');
                return res.status(401).json({ message: 'E-mail ou senha inválidos' });
            }

            if (!await bcrypt.compare(password, user.password)) {
                sails.log.error('Senha errada');
                return res.status(401).json({ message: 'E-mail ou senha inválidos' });
            }
            const token = jwt.sign({ id: user.id }, process.env.TOKEN);
            delete user.password;
            return res.json({ token: token, user: user });
        } catch (err) {
            return res.serverError(err);
        }
    },
    generateToken: async function (req, res) {
        try {
            const email = req.body.email;
            const user = await Users.findOne({ email: email });

            if (user) {
                const token = jwt.sign({ userId: user.id }, process.env.TOKEN, {
                    expiresIn: '24h'
                });

                await Users.updateOne({ email: email }).set({ retrieveToken: token });
                const emailResponse = await sails.helpers.sendEmail(token);

                return res.json({ token: token, user: user, emailResponse: emailResponse });
            }
            res.status(404);
            return res.json({ message: 'Email inválido ', email });

        } catch (err) {
            return res.serverError(err);
        }
    },
    resetPassword: async function (req, res) {
        try {
            const token = req.body.token;
            const user = await Users.findOne({
                retrieveToken: token
            });

            if (!user) {
                return res.status(404).json({ message: 'Token expirado ou inválido!' });
            };
            const passwordHash = await bcrypt.hash(req.body.password, 10);

            await Users.updateOne({ id: user.id }).set({ password: passwordHash, retrieveToken: '' });
            return res.json({ message: 'Senha atualizada com sucesso' });

        } catch (err) {
            return res.serverError(err);
        }
    },

};

