import React, { useEffect, useState } from 'react';
import './style.scss';
import { Movie } from '../List';

interface Props {
   onClick: (id: number) => void;
   list: Movie[];
   searchValue: string;
   loadMore: number;
}
const ListBox = ({ list, searchValue, onClick, loadMore }: Props) => {
   const [localList, setLocalList] = useState<Movie[]>(list);

   useEffect(() => {
      if (searchValue !== '') {
         setLocalList(
            list.filter(
               (element) =>
                  element.title
                     .toLowerCase()
                     .indexOf(searchValue.toLowerCase()) >= 0
            )
         );
      } else {
         setLocalList(list);
      }
   }, [searchValue]);

   useEffect(() => {
      setLocalList(list);
   }, [list]);

   return (
      <div className="list">
         {localList.slice(0, loadMore).map((element) => (
            <div className="list-item" key={element.id}>
               <img src={element.poster} className="poster" />
               <div>
                  <label className="item-name">{element.title}</label>
                  <br />
                  <label className="item-desc">{element.overview}</label>
               </div>
               <button className="button" onClick={() => onClick(element.id)}>
                  Add
               </button>
            </div>
         ))}
      </div>
   );
};

export default ListBox;
