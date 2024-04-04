import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

// TODO: slider: key and length console bug

const Slider = () => {
  // le useData crée un contexte partageé a travers les components, le data dans ce cas sont les events
  const { data } = useData();
  // state de l'index
  const [index, setIndex] = useState(0);
  // function sorts data, by date
  // sort method for arrays, in decsending order
  // if data A is inferior to data B, do -1 else do 1
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // const theLength = byDateDesc.length;
  // console.log(theLength);
  // ! propreties of length cannot be read
  // Change card function, using set timeout (wiht miliseconds at the end), executes code every 5 secs
  const nextCard = () => {
    // state index function, if index inferior to date data variable, do index + 1, else 0
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      3000
    );
  };
  // ? why is there a useEffect for each nextCard
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {/*!  2 children with the same key */}
      {/*!  unique key, each child in list should have a unique key prop */}
      {/* what is byDateDesc? */}
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.id}
            // idx is index
            // what is $ doing here?
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                {/* explain get month method */}
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {/* why is there an underscore and what is radioIdx */}
              {/* key should be changed, what does it access here? */}
              {byDateDesc.map((_, radioIdx) => (
                <input
                  type="radio"
                  name="radio-button"
                  // what is checked?
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
