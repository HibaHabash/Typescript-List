import React from 'react';
import './style.scss';
import { movie, watching } from '../List';

export default function ListBox(props: {
   addRemove: (id: number) => void;
   state: movie | watching;
}) {
   return (
      <>
         <div className="list">
            {props.state.movies.map((element, index) => (
               <div className="list-item" key={index}>
                  <img
                     src={props.state.moviePoster[index]}
                     className="poster"
                  />
                  <div>
                     <label className="item-name">{element}</label>
                     <br />
                     <label className="item-desc">
                        {props.state.movieOverview[index]}
                     </label>
                  </div>
                  <button
                     className="button"
                     onClick={() => props.addRemove(props.state.movieId[index])}
                  >
                     Add
                  </button>
               </div>
            ))}
         </div>
      </>
   );
}
