import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

// TODO: slider

const Slider = () => {
  // explain data custom hook
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // what is focus and sort method, what is evtA etvB
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // what is the "new", explain tenanary function here
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  // ! propreties of length cannot be read
  const nextCard = () => {
    setTimeout(() => setIndex(index < byDateDesc.length ? index + 1 : 0), 5000);
  };
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
            key={event.title}
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
                  key={`${event.id}`}
                  type="radio"
                  name="radio-button"
                  // what is checked?
                  checked={idx === radioIdx}
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
