const ctr = require("../controllers/comment.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "bearer, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/comment/save", ctr.saveComment);

  app.get("/api/comment/getcommentbymovie/:episode_id", ctr.getCommentsByMovie);


};
