const ctr = require("../controllers/movie.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "bearer, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/movie/getmovies", ctr.getMoviesFromUrl);

};
