import React, { useState, useCallback } from 'react';
import './style.scss';

export default function List() {
    const [state, setState] = useState({
        movies: [''],
        watchingList: [''],
    });

    const addFunction = (index: number) => {
        state.watchingList.splice(index, 0, state.movies[index]);
        state.movies.splice(index, 1);
        setState(() => ({
            watchingList: state.watchingList,
            movies: state.movies,
        }));
    };

    const removeFunction = (index: number) => {
        state.movies.splice(index, 0, state.watchingList[index]);
        state.watchingList.splice(index, 1);
        setState(() => ({
            watchingList: state.watchingList,
            movies: state.movies,
        }));
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(() => ({
            watchingList: state.watchingList.filter(
                (watchingList) =>
                    watchingList
                        .toLowerCase()
                        .indexOf(e.target.value.toLowerCase()) >= 0
            ),
            movies: state.movies.filter(
                (movies) =>
                    movies
                        .toLowerCase()
                        .indexOf(e.target.value.toLowerCase()) >= 0
            ),
        }));
    };

    const onSearchCallback = useCallback(onSearch, []);

    return (
        <div className="container">
            <input
                className="search-input"
                placeholder="type here ..."
                onChange={onSearchCallback}
            />
            <div className="list-container">
                <div className="list">
                    {state.movies.map((element, index) => (
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
