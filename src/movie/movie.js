import React, { useEffect, useState } from 'react';
import "./movie.css";
import { Link } from "react-router-dom";


const Movies = () => {

    const [movies, setMovies] = useState([]);
    
    const fetchMovies = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/movies');
            if (!response.ok) {
                throw new Error('Error al obtener las imágenes');
            }
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
        }
    };
    
    useEffect(() => {
        fetchMovies();
    }, []);

    const formatFecha = (fecha) => {
        const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-ES', opciones).replace(/\//g, '/'); // Cambia las barras si es necesario
    };

    return (
        <div className="container pb-5">
        <h2 className="text-center py-5">PELÍCULAS</h2>
        <div className="row">
            {movies.map(movie => (
                <div className="col-md-4 mb-4" key={movie.id}>
                    <div className="card h-100 shadow bc bs">
                        <img
                            src={require(`../img/movies/${movie.id}.jpeg`)}
                            className="card-img-top event-image"
                            alt={`Imagen de ${movie.nombre}`}
                        />
                        <div className="card-body text-center">
                            <h5 className="card-title fs-4 fw-bold text-dark">{movie.name}</h5>
                            <p className="card-text fs-5 text-success">${movie.price}</p>
                            <p className="card-text text-muted">{formatFecha(movie.date)}</p>
                            <Link to={`/detalles/${movie.id}`} className="btn btn-dark fs-6 fw-bold boton">
                                Ver detalles
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};

export default Movies;
