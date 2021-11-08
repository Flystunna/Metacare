const express = require('express');
const app = express();
const _ = require('lodash');
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const db = require("./server/models/index");
const bodyParser = require('body-parser');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

const PORT = process.env.PORT || 7100;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.sequelize.sync({}).then(() => {
    console.log("Initialize Database");
  });

//Rate Limiting
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

//initialize routes
require('./server/routes/movie.routes')(app);
require('./server/routes/character.routes')(app);
require('./server/routes/comment.routes')(app);

//swagger document
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('*', (req, res) => res.status(200).send({
    message: 'Star Wars API is running',
}));

app.listen(PORT, function () {
    console.log(`Server is running on Port: ${PORT}`);
});


module.exports = app;