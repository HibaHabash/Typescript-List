import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss';
import ListBox from '../ListBox';

export interface Movie {
   id: number;
   title: string;
   overview: string;
   release_date: string;
   poster: string;
}

export default function List() {
   const [state, setState] = useState<{
      movieList: Movie[];
      watchingList: Movie[];
      searchValue: string;
      loadMore: number;
   }>({
      movieList: [],
      watchingList: [],
      searchValue: '',
      loadMore: 10,
   });

   const { movieList, watchingList, searchValue, loadMore } = state;

   const fetchData = async () => {
      const data = await axios.get(
         'https://mocki.io/v1/907dd10c-32f7-48a2-a56f-89c66acb723d'
      );
      setState({ ...state, movieList: data.data.data });
   };
   useEffect(() => {
      fetchData();
   }, []);

   const addFunction = (id: number) => {
      setState({
         ...state,
         watchingList: watchingList.concat(
            movieList.splice(
               movieList.findIndex(function (index) {
                  return index.id === id;
               }),
               1
            )
         ),
      });
   };

   const removeFunction = (id: number) => {
      setState({
         ...state,
         movieList: movieList.concat(
            watchingList.splice(
               watchingList.findIndex(function (index) {
                  return index.id === id;
               }),
               1
            )
         ),
      });
   };

   const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, searchValue: e.target.value });
   };
   const LoadMoreFunction = (e: React.MouseEvent<HTMLElement>) => {
      if (loadMore + 10 >= movieList.length) {
         (e.target as HTMLInputElement).disabled = true;
      } else {
         setState({
            ...state,
            loadMore: loadMore + 10,
         });
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
            <ListBox
               onClick={addFunction}
               list={movieList}
               searchValue={searchValue}
               loadMore={loadMore}
            />
            <ListBox
               onClick={removeFunction}
               list={watchingList}
               searchValue={searchValue}
               loadMore={loadMore}
            />
            <button className="button" onClick={LoadMoreFunction}>
               Load More
            </button>
         </div>
      </div>
   );
}
