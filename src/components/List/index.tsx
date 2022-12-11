import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss';

export default function List() {
    const [state, setState] = useState({
        movies: [''],
        watchingList: ['Emily'],
        filteredResults: [''],
        searchInput: '',
    });
    const fetchData = () => {
        return axios
            .get('https://mocki.io/v1/907dd10c-32f7-48a2-a56f-89c66acb723d')
            .then((response) =>
                setState(() => ({
                    ...state,
                    movies: response.data.data.map(
                        ({ title }: { title: string }) => title
                    ),
                }))
            );
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addFunction = (index: number) => {
        state.watchingList.splice(index, 0, state.movies[index]);
        state.movies.splice(index, 1);
        setState(() => ({
            ...state,
            movies: state.movies,
            watchingList: state.watchingList,
        }));
    };

    const removeFunction = (index: number) => {
        state.movies.splice(index, 0, state.watchingList[index]);
        state.watchingList.splice(index, 1);
        setState(() => ({
            ...state,
            movies: state.movies,
            watchingList: state.watchingList,
        }));
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== '') {
            setState(() => ({
                ...state,
                searchInput: e.target.value,
                filteredResults: state.movies.filter(
                    (movies) =>
                        movies
                            .toLowerCase()
                            .indexOf(e.target.value.toLowerCase()) >= 0
                ),
            }));
        } else {
            setState(() => ({
                ...state,
                filteredResults: state.movies,
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
                <div className="list">
                    {state.searchInput.length > 0
                        ? state.filteredResults.map((element, index) => (
                              <div className="list-item" key={index}>
                                  <p className="item-name">{element}</p>
                                  <button
                                      className="button"
                                      onClick={() => addFunction(index)}
                                  >
                                      Add
                                  </button>
                              </div>
                          ))
                        : state.movies.map((element, index) => (
                              <div className="list-item" key={index}>
                                  <p className="item-name">{element}</p>
                                  <button
                                      className="button"
                                      onClick={() => addFunction(index)}
                                  >
                                      Add
                                  </button>
                              </div>
                          ))}
                </div>
                <div className="list">
                    {state.watchingList.map((element, index) => (
                        <div className="list-item" key={index}>
                            <p className="item-name">{element}</p>
                            <button
                                className="button"
                                onClick={() => removeFunction(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
