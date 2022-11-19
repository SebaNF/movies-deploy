const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    creatorName: {
        type: String,
        required: [true, "El nombre del creador de la reseña es obligatorio"],
        minlength: [3, "El nombre debe tener al menos 3 caracteres"]
    },
    rating:{
        type: Number,
        required: [true, "Debe ingresar un rating"],
        min:[1,"Rating debe ser al menos 1"],
        max:[5,"Rating máximo 5"]
    },
    review:{
        type: String,
        required: [true, "Debe ingresar una reseña"],
        minlength: [10, "La reseña debe tener al menos 10 caracteres"]
    } 
    
},{timestamps:true});

const Review = mongoose.model("Review", reviewSchema);

module.exports = {reviewSchema,Review};
