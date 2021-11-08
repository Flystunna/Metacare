const ctr = require("../controllers/character.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "bearer, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/character/getcharacterbymovie", ctr.getCharacterByMovie);

};
