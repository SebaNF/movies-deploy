const mongoose = require("mongoose");
const { Review } = require("./review.models");

const moviesSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Debe ingresar un título"],
        minlength: [3, "El título debe tener al menos 3 caracteres"]
    },
    reviews:[{type:mongoose.Schema.Types.ObjectId,ref:"Review"}],
    average:{
        type:Number,
        default: Review.rating
    }
},{timestamps:true});

const Movies = mongoose.model("Movies", moviesSchema);

module.exports = Movies;
