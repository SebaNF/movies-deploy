import React from 'react';
import {Formik, Field, Form} from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';


const MoviesForm = (props) => {

    const {title, creatorName, rating, review, onSubmitProp} = props;
    const navigate = useNavigate();


    return (
        <div>
            <Formik
                initialValues={{
                    title: title,
                    creatorName: creatorName,
                    rating: rating,
                    review:review
                }}
                /* validationSchema={
                    Yup.object().shape({
                        title: Yup
                            .string()
                            .min(3, "El título es muy corto")
                            .required("Debe ingresar un título"),
                        creatorName: Yup
                            .string()
                            .min(3, "El nombre es muy corto")
                            .required("Debe ingresar un nombre"),
                        rating: Yup
                            .number()
                            .required("Debe ingresar una calificación")
                            .min(1,"rating debe ser al menos 1")
                            .max(5,"rating máximo 5"),
                        review: Yup
                            .string()
                            .min(10, "La reseña debe tener al menos 10 caracteres")
                            .required("Debe ingresar una reseña"),
                    })
                } */
                onSubmit={(values,{setSubmitting})=>{
                    onSubmitProp(values);
                }}
                
            >   
            {({errors, touched, handleSubmit})=>{
                return(
                    <div>
                        <Form>
                            <div className='form-div'>
                                <label htmlFor='title'>Título</label>
                                <Field type="text" name="title" ></Field>
                            </div>
                            <div>
                                {errors.title && touched.title && <p className='error-validation'> {errors.title} </p>}                               
                            </div>    
                            <div className='form-div'>
                                <label htmlFor='creatorName'>Ingrese su nombre</label>
                                <Field type="text" name="creatorName" ></Field>
                            </div>
                            <div>
                                {errors.creatorName && touched.creatorName && <p className='error-validation'> {errors.creatorName} </p>}
                            </div>
                            <div className='form-div'>
                                <label htmlFor='rating'>Calificación</label>
                                <Field type="number" as="select" name="rating" >
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </Field>
                            </div>
                            <div>
                                {errors.rating && touched.rating && <p className='error-validation'> {errors.rating} </p>}
                            </div>
                            <div className='form-div'>
                                <label htmlFor='review'>Escriba su reseña</label>
                                <Field type="text" name="review" as="textarea" ></Field>
                            </div>
                            <div>
                                {errors.review && touched.review && <p className='error-validation'> {errors.review} </p>}
                            </div>
                            <div className='button-form'>
                                <button disabled={Object.values(errors).length>0 || Object.values(touched).length===0} className='submit-cancel' type='submit'>Enviar</button>
                                <button className='submit-cancel' onClick={()=>navigate('/movies')}>Cancel</button>
                            </div>
                            
                        </Form>                        
                    </div>
                )
            }}
            </Formik>
        </div>
    );
}

export default MoviesForm;
