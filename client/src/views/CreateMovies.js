import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MoviesForm from '../components/MoviesForm';
import { simplePost } from '../services/movies.services';

const CreateMovies = () => {
    
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const createMovie = async(values) =>{
        try{
            const response = await simplePost('http://localhost:8000/api/movies',values)
            if(response.data.message !== "" ){
                const errorResponse = response.data.errors;
                const errorArr = [];
                for (const llave of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[llave].message);
            }
            setErrors(errorArr);
                
            }else{
                navigate('/movies')
            }
            
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div>
            <h2>Agregar Película y una Reseña</h2>
            <MoviesForm title="" creatorName="" rating={1} review="" onSubmitProp={createMovie}/>
            {errors?.map((error,index)=><p className='error-validation' key={index}>{error}</p>)}
        </div>
    );
}

export default CreateMovies;
