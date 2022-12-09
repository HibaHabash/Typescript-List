import React from 'react';
import './style.scss';
export default function List() {
    return (
        <div className="container">
            <input className="search-input" placeholder="type here ..." />
            <div className="list-container">
                <div className="list"></div>
                <div className="list"></div>
            </div>
        </div>
    );
}
