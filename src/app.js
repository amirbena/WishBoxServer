const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes');


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/users', routes.UserRoute);
app.use('/rooms', routes.RoomRoute);
app.use('/reservations', routes.ReservationRoute);


const PORT = process.env.PORT || 80;


const server = app.listen(PORT, () => console.log(`Listenes to ${PORT} port`));

module.exports = server;