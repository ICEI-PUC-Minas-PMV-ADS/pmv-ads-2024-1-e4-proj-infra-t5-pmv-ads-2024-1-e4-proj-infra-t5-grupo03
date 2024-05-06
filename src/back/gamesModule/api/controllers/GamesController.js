const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    getAll: async function (req, res) {
        const searchQuery  = req.headers.searchQuery || req.query;
        const page = req.headers.page;
       
        console.log(page)
        const url = searchQuery ? `https://rawg.io/api/games?token&key=${process.env.API_KEY}&page=${page || 1}&search=${encodeURIComponent(searchQuery)}` : `https://rawg.io/api/games?token&key=${process.env.API_KEY}&page=${page || 1}&ordering=-rating`;
        const options = {
            method: 'GET',
        };

        try {
            const response = await fetch(url, options);
            return res.json(await response.json());
        } catch (err) {
            return res.serverError(err);
        }
    },
    getById: async function (req, res) {
        const url = `https://rawg.io/api/games/${req.params.id}?token&key=${process.env.API_KEY}`;
        const options = {
            method: 'GET',
        };

        try {
            const response = await fetch(url, options);
            return res.json(await response.json());
        } catch (err) {
            return res.serverError(err);
        }
    },
    getReleases: async function (req, res) {
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        if(month <= 9) month = '0' + month;
        const url = `https://rawg.io/api/games?dates=${year}-${month}-01,${year}-${month}-30&ordering=-added?token&key=${process.env.API_KEY}`;
        const options = {
            method: 'GET',
        };
        try {
            const response = await fetch(url, options);
            return res.json(await response.json());
        } catch (err) {
            return res.serverError(err);

        }
    }

};

