const db = require("../models");
const got = require('got');
const Comment = db.comment;
const _ = require('lodash');

exports.getMoviesFromUrl = async () => {
    var result = await got.get('https://swapi.dev/api/films', { responseType: 'json' });
    if (result?.body?.count > 0) {
        const movies = result.body.results;
        var ordermovies = _.orderBy(movies, ['release_date'], ['asc']);
        const results = [];
        for (movie of ordermovies) {
            var comments = await Comment.findAll({ where: { episode_id: movie?.episode_id } });
            var current = {
                title: movie?.title,
                opening_crawl: movie?.opening_crawl?.replace(/\r?\n|\r/g, " "),
                comments: comments.length
            }
            results.push(current);
        }
        return results;
    }
    throw new Error("No movies found");
}

