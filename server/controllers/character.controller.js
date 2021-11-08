const svc = require("../services/character.service");

exports.getCharacterByMovie = async (req, res) => {
    try {
        var movies = await svc.getCharacterByMovie(req?.body?.episode_id, req?.body?.sort, req?.body.order, req?.body?.gender);
        res.json(movies);
    } catch (error) {
        res.status(400).send({ message: error?.error ?? error?.message });
    }
}
