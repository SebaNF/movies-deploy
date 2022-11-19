const Movies = require("../models/movies.models")
const { Review } = require("../models/review.models")


module.exports.createReview= async (req, res) =>{
    try{
        const { review, creatorName, rating, idMovie} = req.body;
        const reviewMovie = await Review.create({review,creatorName,rating});
        const movie = await Movies.findById(idMovie).exec();
        const reviewedMovies = await Movies.findById(idMovie).populate("reviews").exec();
        let totalReviews = reviewedMovies.reviews.length + 1;
        let sumReviews = reviewedMovies.reviews.reduce((acumulado, elemento)=>acumulado+=Number(elemento.rating), 0) + Number(rating);
        let avg = Number((sumReviews/totalReviews).toFixed(2));
        const updateReviewAverage = await Movies.findByIdAndUpdate({_id:idMovie}, {average:avg}, {new:true});
        movie.reviews.push(reviewMovie);
        await movie.save();
        updateReviewAverage.save();
        res.json({message:"", review: review})

    }catch(err){
        res.json({message:"Ha ocurrido un error",errors:err.errors})
    }
};

module.exports.getReviews = async (req, res) =>{
    try{
        const {idMovie} = req.params;
        const movie = await Movies.findById(idMovie).populate("reviews").exec();
        res.json({message:"",reviews:movie.reviews})
    }catch(err){
        res.json({message:"Ha ocurrido un error",errors:err.errors})
    }
};


