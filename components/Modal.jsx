'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Modal({ imdbID }) {
  const [movieData, setMovieData] = useState({});
  const [modalStatus, setModalStatus] = useState({});
  const apikey = process.env.NEXT_PUBLIC_APIKEY

  useEffect(() => {
    const fetchMovieData = async () => {
      const res = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apikey}`);
      setMovieData((prevData) => ({ ...prevData, [imdbID]: res.data }));
    };

    fetchMovieData();
  }, [imdbID]);

  const openModal = (imdbID) => {
    setModalStatus((prevStatus) => ({ ...prevStatus, [imdbID]: true }));
  };

  const closeModal = (imdbID) => {
    setModalStatus((prevStatus) => ({ ...prevStatus, [imdbID]: false }));
  };

  return (
    <div>
      {Object.keys(movieData).map((id) => {
        const movie = movieData[id];
        if (!movie) {
          return null;
        }
        return (
          <div key={id}>
            <div className="flex justify-center">
              <button onClick={() => openModal(id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full" type="button">
                <span className='w-full text-center'>Details</span>
              </button>
            </div>

            <div id={`readProductModal${id}`} tabIndex={-1} aria-hidden="true" className={`fixed top-0 left-0 right-0 z-50 ${modalStatus[id] ? '' : 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full py-auto`}>
              <div className="relative w-full max-w-2xl max-h-full mx-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Details Movie
                    </h3>
                    <button onClick={() => closeModal(id)} data-modal-toggle="readProductModal" type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="container mx-auto">
                      <div className="md:flex">
                        <div className="md:w-1/4">
                          <img src={movie.Poster} className='w-full h-full'/>
                        </div>
                        <div className="md:w-3/4 ml-2">
                          <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex"><strong className="font-bold">Title:</strong><span className='ml-auto'>{movie.Title} ({movie.Year})</span></li>
                            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex"><strong className="font-bold">Official Released:</strong><span className='ml-auto'>{movie.Released}</span></li>
                            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex"><strong className="font-bold">Duration:</strong><span className='ml-auto'>{movie.Runtime}</span></li>
                            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex"><strong className="font-bold">Genre:</strong><span className='ml-auto'>{movie.Genre}</span></li>
                            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex"><strong className="font-bold">Director:</strong><span className='ml-auto'>{movie.Director}</span></li>
                            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex"><strong className="font-bold">Writer:</strong><span className='ml-auto'>{movie.Writer}</span></li>
                            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex"><strong className="font-bold">Actors:</strong><span className='ml-auto'>{movie.Actors}</span></li>
                            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex"><strong className="font-bold mr-2">Language:</strong><span className='ml-auto'>{movie.Language}</span></li>
                            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex"><strong className="font-bold mr-2">Plot:</strong><span>{movie.Plot}</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button onClick={() => closeModal(id)} data-modal-toggle="readProductModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 ml-auto">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    })}
    </div>
  );
}
