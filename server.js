const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;

app.use( express.json() );

app.use(express.urlencoded({ extended:true }));

app.use(cors());

require('./server/config/mongoose.config');

const moviesRoutes = require('./server/routes/movies.routes');

moviesRoutes(app);

app.listen( port, () => console.log('Servidor inicidado en puerto: ', port));