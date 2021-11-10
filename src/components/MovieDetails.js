import React, { useEffect, useState } from 'react';

function MovieDetails(properties) {
    const [movieDetails, setMovieDetails] = useState({});

    useEffect(() => {
        const imdbID = properties.match.params.imdbID;
        console.log(properties.match.params.imdbID);

        extractMovieDetailsByID(imdbID);
    }, []);

    const extractMovieDetailsByID = (imdbID) => {
        const movieDetailsURL = `https://www.omdbapi.com/?i=${imdbID}&apikey=b397790b`;
        fetch(movieDetailsURL)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setMovieDetails(result)
        });
    };
    return (
        <div className="justify-content-center">
            <div className="container">
                <div id="header" className="col mb-4">
                    <div className="row justify-content-center mt-3">
                        <h1>Details on {movieDetails.Title}</h1>
                    </div>
                </div>
                
                <div className="row justify-content-center">
                    <div className="col container">
                        <img className="ml-5" width="400px" height="600px" src={movieDetails.Poster} alt={"Poster for "+movieDetails.Title}/>
                    </div>
                    <div className="col">
                        <h6>{movieDetails.Plot}</h6>
                    </div>
                </div>
            </div>

            <div id="footer" className="row justify-content-center pt-4 pb-3 mt-2">
                    <a className="mr-4" href="/#search-bar">Search</a>
                    <p>|</p>
                    <a className="ml-4" target="_blank" href="http://iwt.ranken.edu/gbreeding/BlogSite/">Developer</a>
            </div>
        </div>
    );
};

export default MovieDetails;