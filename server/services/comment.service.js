const db = require("../models");
const Comment = db.comment;
const got = require('got');
const _ = require('lodash');

//Comments
exports.saveComment = async (body, ip) => {
    if (!body?.episode_id) {
        throw new Error("Episode Id is required");
    }
    if (!body?.comment) {
        throw new Error("Comment is required");
    }
    if (body?.comment?.length > 500) {
        throw new Error("Comment can not be more than 500 characters");
    }
    var validate = await exports.validateMovieExist(episode_id);
    if(validate){
        var saveComment = await Comment.create({
            comment: body?.comment,
            ip_address: ip ?? "No IP Found",
            episode_id: body?.episode_id
        });
        return saveComment;
    }
    else throw new Error("Movie Not Found On Swapi");
}

exports.getCommentsByMovie = async (episode_id) => {
    if (!episode_id) {
        throw new Error("Episode Id is required");
    }
    var existingComments = await Comment.findAll({
        where: {
            episode_id: [episode_id]
        },
        order: [
            ['createdAt', 'DESC'],
        ],
        attributes: ['id', 'comment', 'ip_address', 'episode_id', 'createdAt']
    });
    if (existingComments?.length > 0) return existingComments;
    else throw new Error("No Comments Found");
}


exports.validateMovieExist = async (episode_id) => {
    try {
        var result = await got.get(`https://swapi.dev/api/films/${episode_id}`, { responseType: 'json' });
        if (result?.body) {
            return true;
        }
        else throw new Error("Movie Not Found On Swapi");
    } catch (error) {

    }
}
