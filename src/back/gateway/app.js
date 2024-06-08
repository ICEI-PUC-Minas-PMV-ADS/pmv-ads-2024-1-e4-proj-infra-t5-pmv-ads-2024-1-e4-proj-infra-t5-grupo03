const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 1337;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());


app.post('/makeRequest', async (req, res) => {
    if(!req.headers.token){
        return res.status(401).json({message: "No token"});
    };
    if(req.headers.token !== process.env.AUTH_TOKEN){
        return res.status(401).json({message: "Wrong token"});
    }
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
        if (req.headers.method !== 'GET') {
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
                return res.json({ message: 'Nenhum módulo encontrado!' })

        };
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
