const { getMovies, getOneMovie, createMovie, updateMovie, deleteMovie } = require("../controllers/movies.controllers");
const { createReview, getReviews, deleteReview } = require("../controllers/reviews.controllers");


module.exports = (app) =>{

    app.get('/api/movies', getMovies);
    app.get('/api/movies/:id', getOneMovie);
    app.post('/api/movies/', createMovie);
    app.put('/api/movies/:id',updateMovie);
    app.delete('/api/movies/:id', deleteMovie);

    app.post('/api/review/', createReview);
    app.get('/api/reviews/:idMovie', getReviews)
};