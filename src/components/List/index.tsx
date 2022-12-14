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
   }>({
      movieList: [],
      watchingList: [],
      searchValue: '',
   });

   const { movieList, watchingList, searchValue } = state;

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
      watchingList.splice(
         0,
         0,
         movieList[
            movieList.findIndex(function (index) {
               return index.id === id;
            })
         ]
      );

      movieList.splice(
         movieList.findIndex(function (index) {
            return index.id === id;
         }),
         1
      );
      setState({ ...state });
   };

   const removeFunction = (id: number) => {
      movieList.splice(
         0,
         0,
         watchingList[
            watchingList.findIndex(function (index) {
               return index.id === id;
            })
         ]
      );

      watchingList.splice(
         watchingList.findIndex(function (index) {
            return index.id === id;
         }),
         1
      );
      setState({ ...state });
   };

   const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, searchValue: e.target.value });
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
            />
            <ListBox
               onClick={removeFunction}
               list={watchingList}
               searchValue={searchValue}
            />
         </div>
      </div>
   );
}
