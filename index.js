const http = require('http');
const express = require('express');
const status = require('http-status');
const sequelize = require('./src/database/database');
const app = express();
const routes = require('./src/routes/routes.js');
const cors = require('cors');

// enable JSON
app.use(express.json());

// Adding cors (to use API's)
app.use(cors());

// setting group's routes
app.use('/sistema', routes);

// Error's server, parser.json
app.use((req, res, next) => {
    res.status.apply(status.INTERNAL_SERVER_ERROR).json({ error });
});

// verify table at db_usuario and starting node server
sequelize.sync({ force: false }).then(() => {
    const port = 3003;
    app.set("port", port);
    const server = http.createServer(app);
    server.listen(port);
});
