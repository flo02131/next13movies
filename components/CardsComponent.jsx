'use client'
import React, { useState, useEffect } from "react";
import Modal from "./Modal";

export default function CardsComponent({ movies }) {
  const [modalKey, setModalKey] = useState(0);

  useEffect(() => {
    setModalKey(modalKey + 1);
  }, [movies]);

  return (
    <div className="flex flex-wrap">
      {movies && movies.map((movie, i) => (
          <div className="w-full px-10 lg:w-1/2 xl:w-1/3 mb-16" key={i}>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img className="rounded-t-lg w-full" src={movie.Poster} alt="poster"/>
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.Title} ({movie.Year})</h5>
                </a>
                <Modal key={modalKey} imdbID={movie.imdbID} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
