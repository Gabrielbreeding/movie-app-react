// get imports
import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';

function MovieList () {
    // set up constant variables
    const [searchTerm, setSearchTerm] = useState(''); // creates a state value that holds a string
    const [movies, setMovies] = useState([]);         // creates a state value that holds an array
    const [noMovieFound, setNoMovieFound] = useState(false);

    const handleChange = (event) => { // event = onChange, target = object calling the function, value = 
        setSearchTerm(event.target.value);
    };

    const handleClearScreen = () => {
        setMovies([]);
        setSearchTerm("");
        localStorage.removeItem("searchTerm");
        setNoMovieFound("");
        document.getElementById("search-bar").value = "";
    };

    const handleClick = (movie) => {
        const movieURL = `http://www.omdbapi.com/?s=${movie}&apikey=b397790b`;

        localStorage.setItem("searchTerm", movie);
        fetch(movieURL)
        .then(response => response.json())
        .then(result => {
            if(result.Error) {
                setMovies([]);
                setNoMovieFound(true);
            } else {
                //console.log(result);
                setMovies(result.Search);
                setNoMovieFound(false);
            };
        });
    };

    useEffect(() => {
        let term = localStorage.getItem("searchTerm");

        if (term) {
            handleClick(term);
        };
    }, []);

    const returnedMovies = movies.map(movie => {
        return (
            <div key={movie.imdbID} className="ml-2 mr-2 mb-2">
                <NavLink to={`/${movie.imdbID}`}><img width="200px" height="300px" src={movie.Poster} alt={"Poster for " +movie.Title}/></NavLink>
            </div>
        );
    });
    
    return (
        <div className="justify-content-center">
            <div id="header" className="col mb-4">
                <div className="row justify-content-center mt-3">
                    <h1>React Movie App</h1>
                </div>
                <div className="row justify-content-center mt-3">
                    <label className="mr-2" htmlFor="title">Movie Title:</label>
                    <input id="search-bar" type="text" onChange={handleChange}/>
                </div>
                <div className="row justify-content-center mt-3">
                    <button className="mr-5 btn-success" onClick={() => handleClick(searchTerm)}>Search</button>
                    <button className="btn-primary" onClick={handleClearScreen}>Clear</button>
                </div>
            </div>
            
            <div className="container d-flex flex-wrap justify-content-center">
                {returnedMovies}
                {noMovieFound ? <h1 style={{paddingTop: 15 + '%', paddingBottom: 23 + '%' }}>Error 404: No Movies found</h1> : null}
            </div>

            <div id="footer" className="row justify-content-center pt-4 pb-3">
                    <a className="mr-4" href="#search-bar">Search</a>
                    <p>|</p>
                    <a className="ml-4" target="_blank"href="http://iwt.ranken.edu/gbreeding/BlogSite/">Developer</a>
            </div>
        </div>
        //  {boolean ? (if true):(if false)}
    );
};

export default MovieList;