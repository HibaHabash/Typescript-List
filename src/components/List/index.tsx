import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss';
import ListBox from '../ListBox';

export type movie = {
   movies: string[];
   movieId: number[];
   moviePoster: string[];
   movieOverview: string[];
};

export default function List() {
   const [state, setState] = useState<movie>({
      movies: [''],
      movieId: [],
      moviePoster: [''],
      movieOverview: [''],
   });
   const [watchingState, setWatchingState] = useState<movie>({
      movies: [''],
      movieId: [],
      moviePoster: [''],
      movieOverview: [''],
   });

   const [searchInput, setSearchInput] = useState('');

   const fetchData = () => {
      return axios
         .get('https://mocki.io/v1/907dd10c-32f7-48a2-a56f-89c66acb723d')
         .then((response) =>
            setState(() => ({
               ...state,
               movies: response.data.data.map(
                  ({ title }: { title: string }) => title
               ),
               movieId: response.data.data.map(({ id }: { id: number }) => +id),
               moviePoster: response.data.data.map(
                  ({ poster }: { poster: string }) => poster
               ),
               movieOverview: response.data.data.map(
                  ({ overview }: { overview: string }) => overview
               ),
            }))
         );
   };

   useEffect(() => {
      fetchData();
      watchingState.movies.pop();
      watchingState.movieOverview.pop();
      watchingState.moviePoster.pop();
      watchingState.movieId.pop();
      setWatchingState(() => ({
         ...watchingState,
      }));
   }, []);

   const addFunction = (id: number) => {
      watchingState.movies.splice(
         0,
         0,
         state.movies[state.movieId.indexOf(id)]
      );
      watchingState.moviePoster.splice(
         0,
         0,
         state.moviePoster[state.movieId.indexOf(id)]
      );
      watchingState.movieOverview.splice(
         0,
         0,
         state.movieOverview[state.movieId.indexOf(id)]
      );
      watchingState.movieId.splice(
         0,
         0,
         state.movieId[state.movieId.indexOf(id)]
      );

      state.movies.splice(state.movieId.indexOf(id), 1);
      state.moviePoster.splice(state.movieId.indexOf(id), 1);
      state.movieOverview.splice(state.movieId.indexOf(id), 1);
      state.movieId.splice(state.movieId.indexOf(id), 1);

      setWatchingState(() => ({
         ...watchingState,
      }));

      setState(() => ({
         ...state,
      }));
   };

   const removeFunction = (id: number) => {
      state.movies.splice(
         0,
         0,
         watchingState.movies[watchingState.movieId.indexOf(id)]
      );
      state.moviePoster.splice(
         0,
         0,
         watchingState.moviePoster[watchingState.movieId.indexOf(id)]
      );
      state.movieOverview.splice(
         0,
         0,
         watchingState.movieOverview[watchingState.movieId.indexOf(id)]
      );
      state.movieId.splice(
         0,
         0,
         watchingState.movieId[watchingState.movieId.indexOf(id)]
      );

      watchingState.movies.splice(watchingState.movieId.indexOf(id), 1);
      watchingState.moviePoster.splice(watchingState.movieId.indexOf(id), 1);
      watchingState.movieOverview.splice(watchingState.movieId.indexOf(id), 1);
      watchingState.movieId.splice(watchingState.movieId.indexOf(id), 1);

      setState(() => ({
         ...state,
      }));
      setWatchingState(() => ({
         ...watchingState,
      }));
   };

   const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
      if (searchInput !== '') {
         setState(() => ({
            ...state,
            movies: state.movies.filter(
               (movies) =>
                  movies.toLowerCase().indexOf(e.target.value.toLowerCase()) >=
                  0
            ),
         }));
      } else {
         setState(() => ({
            ...state,
         }));
      }
   };

   return (
      <div className="container">
         <input
            className="search-input"
            placeholder="type here ..."
            onChange={onSearch}
         />
         <div className="list-container">
            <p className="item-name">Movies</p>
            <p className="item-name">Watching List</p>
            <ListBox addRemove={addFunction} state={state} />
            <ListBox addRemove={removeFunction} state={watchingState} />
         </div>
      </div>
   );
}
