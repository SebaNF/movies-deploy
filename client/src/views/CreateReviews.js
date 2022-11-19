import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewsForm from '../components/ReviewsForm';
import { simplePost } from '../services/movies.services';

const CreateReviews = () => {

    const {idMovie} = useParams();
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const createReview = async(values) =>{
        values = {...values, idMovie:idMovie}
        try{
            const response = await simplePost('http://localhost:8000/api/review',values)
            console.log(response)
            if(response.data.message !== ""){
                const errorResponse = response.data.errors;
                const errorArr = [];
            for (const llave of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[llave].message);
            }
        setErrors(errorArr);
                
            }else{
                navigate(`/movies/${idMovie}`)
            }
            
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div>
            <div>
                <h2>Escriba una Reseña</h2>
                <ReviewsForm creatorName="" rating={1} review="" onSubmitProp={createReview}/>
                {errors?.map((error,index)=><p className='error-validation' key={index}>{error}</p>)}
            </div>
        </div>
    );
}

export default CreateReviews;
