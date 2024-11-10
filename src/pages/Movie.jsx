import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Movie = () => {
    const [search, setSearch] = useState('titan');
    const [data, setData] = useState([]);

    // Function to handle input change
    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    // Function to fetch movie data
    const MoviePrint = async () => {
        if (!search) return;  // Prevent API call for empty search
        const API = `https://www.omdbapi.com/?apikey=1c12799f&s=${search}&page=1`;
        try {
            const response = await axios.get(API);
            setData(response.data.Search || []);  // Set an empty array if no movies found
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    // Effect to fetch data when search input changes
    useEffect(() => {
        if (search) {
            MoviePrint();
        }
    }, [search]);
    return (
        <>
            <input
                type="text"
                placeholder="Enter movie name"
                value={search}
                onChange={handleChange}
            />
            {data.length>0 ? (
                data.map((movie) => (
                    <div key={movie.imdbID}>
                        <h1>{movie.Title}</h1>
                        <img src={movie.Poster} alt={movie.Title} />
                    </div>
                ))
            ):(
                <p>no movie found till now</p>
            )
           }
        </>
    );
};

export default Movie;
