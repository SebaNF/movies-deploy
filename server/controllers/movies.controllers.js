const Movies = require("../models/movies.models");
const { Review } = require("../models/review.models");

module.exports.getMovies = (req, res) =>{
    Movies.find()
        .then((movies)=>res.json({movies}))
        .catch((err)=>res.json({message:"Ha ocurrido un error",error:err}));
};

module.exports.getOneMovie = (req,res) =>{
    Movies.findOne({_id:req.params.id})
        .then((movie)=>res.json({movie:movie}))
        .catch((err)=>res.json({message:"Ha ocurrido un error",error:err}));
};
module.exports.createMovie = async(req,res)=>{
    try{
        const {title, creatorName, review, rating} = req.body;
        
            const reseña = new Review({creatorName, rating, review});
            const movie = new Movies({title});
            movie.reviews.push(reseña);
            movie.average = rating;            
            await reseña.save();               
            await movie.save();
            res.json({message:"",movie:movie, review:reseña })
            
    }
    catch(err){
        res.json({message:"Algo salio mal",errors:err.errors})
    }
}

module.exports.updateMovie = (req,res) =>{
    Movies.findOneAndUpdate({_id: req.params.id},req.body,{runValidators:true, new:true})
        .then((movieEditada)=> res.json ({message:"", movie:movieEditada}))
        .catch((err)=>res.json({message:"Ha ocurrido un error",error:err.errors}));
};

module.exports.deleteMovie = (req,res) =>{
        Movies.deleteOne({_id: req.params.id})
            .then((result)=>res.json({result:result}))
            .catch((err)=>res.json({message:"Ha ocurrido un error",error:err}));
};