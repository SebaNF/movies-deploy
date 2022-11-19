import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { simpleDelete, simpleGet } from '../services/movies.services';

const Reviews = () => {

    const {idMovie} = useParams();
    const [reviews, setReviews] = useState();
    const [movies, setMovies] = useState();
    const navigate = useNavigate();

    const getReviews = async() =>{
        try{
            const response = await simpleGet(`http://localhost:8000/api/reviews/${idMovie}`);
            console.log(response.data);
            setReviews(response.data.reviews);            
        }catch(err){
            console.log(err);
        }
    };
    const getMovies = async() =>{
        try{
            const response = await simpleGet('http://localhost:8000/api/movies')
            console.log(response.data.movies)
            setMovies(response.data.movies);
            
        }catch(err){
            console.log(err)
        }
    };

    useEffect(() => {
        getReviews();
        getMovies();
    }, []);

    const deleteMovie = async() =>{
        try{
            const response = await simpleDelete(`http://localhost:8000/api/movies/${idMovie}`);
            console.log(response);
            navigate('/movies');
        }catch(err){
            console.log(err)
        }
    }
    
    const auxArray = movies?.filter((movie)=>movie._id === idMovie)
    return (
        <div>
            
            {movies &&     
            <h2>Reviews de: {auxArray[0]?.title}</h2>          
            }           
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Nombre crítico</th>
                        <th>Rating</th>
                        <th>Reseña</th>                         
                    </tr>
                </thead>
                <tbody>
                    {reviews?.map((review)=>
                    <tr key={review._id}>
                        <td>{review.creatorName}</td>
                        <td className="text-center">{review.rating}</td>
                        <td>{review.review}</td>
                    </tr>
                    )}
                </tbody>
            </table>
            <button type="button" className="delete-btn" onClick={()=>deleteMovie()}>Borrar Película</button>
            <button type="button" className="btn btn-link" onClick={()=>navigate('/movies')}>Volver</button>
        </div>
    );
}

export default Reviews;
