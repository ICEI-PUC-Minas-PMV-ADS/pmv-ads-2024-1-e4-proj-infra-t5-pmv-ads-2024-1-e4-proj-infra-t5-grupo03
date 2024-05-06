
module.exports = {
    create: async function (req, res) {
        try {
            const evaluation = await Evaluations.findOne({ game_id: req.body.game_id, user_id: req.body.user_id });
            if (evaluation) {
                sails.log.info('Esse usuário já avaliou esse jogo!');
                await Evaluations.updateOne({ game_id: req.body.game_id, user_id: req.body.user_id }).set({ note: req.body.note, review: req.body.review });

                return res.status(200).json({ message: 'Nota atualizada!' });
            };
            const newEvaluation = await Evaluations.create({
                game_id: req.body.game_id,
                user_id: req.body.user_id,
                note: req.body.note,
                review: req.body.review,
            }).fetch();
            return res.json(newEvaluation);
        } catch (err) {
            return res.serverError(err);
        }
    },
    getByGame: async function (req, res) {
        const { game_id } = req.params;
        if (!game_id) {
            res.status(400);
            return res.json({ message: 'Nenhum id foi passado!' });
        }
        try {
            const evaluations = await Evaluations.find({ game_id: game_id });
            return res.json(evaluations);
        } catch (err) {
            return res.serverError(err);
        }
    },
    getByUser: async function (req, res) {
        const { user_id } = req.params;
        if (!user_id) {
            res.status(400);
            return res.json({ message: 'Nenhum id foi passado!' });
        }
        try {
            const evaluations = await Evaluations.find({ user_id: user_id });
            return res.json(evaluations);
        } catch (err) {
            return res.serverError(err);
        }
    },


};

