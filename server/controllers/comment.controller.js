const svc = require("../services/comment.service");

exports.getCommentsByMovie = async (req, res) => {
    try {
        var movies = await svc.getCommentsByMovie(req?.params?.episode_id);
        res.json(movies);
    } catch (error) {
        res.status(400).send({ message: error?.error ?? error?.message });
    }
}



exports.saveComment = async (req, res) => {
    try {
        const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
        var comment = await svc.saveComment(req?.body, ip_address);
        res.json(comment);
    } catch (error) {
        res.status(400).send({ message: error?.error ?? error?.message });
    }
}


