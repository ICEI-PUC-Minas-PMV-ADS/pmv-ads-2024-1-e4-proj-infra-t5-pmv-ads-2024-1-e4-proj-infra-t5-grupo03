const StatusEnum = ['OWNED', 'WANTED', 'ALREADY_HAD', 'BORROWED'];

module.exports = {
    create: async function (req, res) {
        try {
            if (!StatusEnum.includes(req.body.status)) {
                res.status(422);
                return res.json({ message: 'Status incorreto!' })
            };
            const newCollection = await Collections.create({
                status: req.body.status,
                game_id: req.body.game_id,
                user_id: req.body.user_id,
            }).fetch();
            return res.json(newCollection);
        } catch (err) {
            return res.serverError(err);
        }
    },
    getByStatus: async function (req, res) {
        try {
            const { status } = req.params;
            if (!StatusEnum.includes(status)) {
                res.status(422);
                return res.json({ message: 'Status incorreto!' })
            };
            const collections = await Collections.find({ status: status });
            return res.json(collections);
        } catch (err) {
            return res.serverError(err);
        }
    },
    getByUser: async function (req, res) {
        try {
            const { user_id, status } = req.params;
            if (!user_id) {
                res.status(400);
                return res.json({ message: 'Nenhum id foi passado!' });
            };
            const collections = await Collections.find({ user_id: user_id, status: status });
            return res.json(collections);
        } catch (err) {
            return res.serverError(err);
        }
    },

};

