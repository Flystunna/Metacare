const svc = require("../services/movie.service");

exports.getMoviesFromUrl = async (req, res) => {
    try {
        var movies = await svc.getMoviesFromUrl();
        res.json(movies);
    } catch (error) {
        res.status(400).send({ message: error?.error ?? error?.message });
    }
}

