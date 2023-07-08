'use client'
import { useState, Suspense } from "react";
import axios from "axios";
import CardsComponent from "@/components/CardsComponent";
import SearchInputComponent from "@/components/SearchInputComponent";

const apikey = process.env.NEXT_PUBLIC_APIKEY

const Movies = () => {
  const [movies, setMovies] = useState([]);

  const handleSearch = async (input) => {
    const response = await axios.get(`https://www.omdbapi.com/?s=${input}&apikey=${apikey}`);
    setMovies(response.data.Search);
  };

  return (
    <div>
      <div className="py-12 px-80 mb-5">
        <SearchInputComponent onSearch={handleSearch} />
      </div>

      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <CardsComponent movies={movies} />
        </Suspense>
      </div>
    </div>
  );
};

export default Movies;
