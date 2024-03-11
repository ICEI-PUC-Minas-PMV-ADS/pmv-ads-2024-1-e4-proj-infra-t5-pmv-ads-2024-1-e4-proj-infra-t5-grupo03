const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    getAll: async function (req, res) {
        const { searchQuery, page } = req.query;
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

};

