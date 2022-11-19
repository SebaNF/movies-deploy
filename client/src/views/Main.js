import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { simpleGet } from '../services/movies.services';

const Main = () => {

    const [movies, setMovies] = useState();
    const navigate = useNavigate();

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
        getMovies();
    }, []);

    return (
        <div>
            <div className='main-header'>
                <h2>Lista de Películas</h2>
                <button className='addmovie-Button' onClick={()=>navigate('/movies/new')}>Agregar Película</button>
            </div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Título película</th>
                        <th>Av. Rating</th>
                        <th>Acciones</th>                         
                    </tr>
                </thead>
                <tbody>
                    {movies?.map((movie)=>
                    <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td className="text-center">{movie.average}</td>
                        <td>
                            <div className='actions-button'>
                                <button className="read-btn" onClick={()=>navigate(`/movies/${movie._id}`)}>Leer reseñas</button> 
                                <button className="write-btn" onClick={()=>navigate(`/movies/${movie._id}/review`)}>Escribir una reseña</button>
                            </div>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Main;
