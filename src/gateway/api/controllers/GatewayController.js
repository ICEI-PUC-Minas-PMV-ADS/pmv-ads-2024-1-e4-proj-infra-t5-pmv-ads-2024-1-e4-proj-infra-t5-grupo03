
module.exports = {
    makeRequest: async function (req, res) {
        try {
            const module = req.headers.module;
            const route = req.headers.route;
            if (!module || !route) {
                res.status(422);
                return res.json({ message: 'Nenhum módulo/rota encontrado!' })
            };

            const { searchQuery, page } = req.query;
            const options = {
                method: req.headers.method,
                headers: {
                    token: process.env.AUTH_TOKEN,
                    searchQuery: searchQuery,
                    page: page ?? 1
                }
            };
            if(req.headers.method !== 'GET'){
                options.body = JSON.stringify(req.body)
            }
            switch (module) {
                case 'users':
                    const responseUsers = await fetch(process.env.USERS_MODULE_URL + route, options);
                    res.status(responseUsers.status);
                    return res.json(await responseUsers.json());
                case 'games':
                    const responseGames = await fetch(process.env.GAMES_MODULE_URL + route, options);
                    res.status(responseGames.status);
                    return res.json(await responseGames.json());
                case 'collections':
                    const responseCollections = await fetch(process.env.COLLECTIONS_MODULE_URL + route, options);
                    res.status(responseCollections.status);
                    return res.json(await responseCollections.json());
                case 'evaluations':
                    const responseEvaluations = await fetch(process.env.GAMES_MODULE_URL + route, options);
                    res.status(responseEvaluations.status);
                    return res.json(await responseEvaluations.json());
                default:
                    res.status(404);
                    return res.json({message: 'Nenhum módulo encontrado!'})

            };
        } catch (err) {
            return res.serverError(err);
        }
    }

};

