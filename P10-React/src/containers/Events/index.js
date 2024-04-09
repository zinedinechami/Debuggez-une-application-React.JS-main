import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

// ! event section = card not appearing issue, problem could be select values, change Type

const PER_PAGE = 9;

function EventList() {
  // FETCH DATA PROP
  // usecontext data hook, with error handling if event is not found
  const { data, error } = useData();
  // TYPE OF EVENT
  // state for the type of event
  const [type, setType] = useState();
  // MAKE PAGE APPEAR?
  // state for the current page that appears
  const [currentPage, setCurrentPage] = useState(1);

  // RETURNS ARRAY THAT FILTERS DATA
  // if type, show event, else events, or array,
  // filter returns an array that meets conditions
  const filteredEvents = ((!type ? data?.events : data?.events) || []).filter(
    (event, index) => {
      if (
        // if currentPage - 1, multiplied by per_page (9) inferior or equal to index,
        // render per page(9) multiplied by currentpage superior to index
        (currentPage - 1) * PER_PAGE <= index &&
        PER_PAGE * currentPage > index
      ) {
        // if condition is met, return true, else false
        return true;
      }
      return false;
    }
  );

  // UPDATE STATE AND TYPE OF CURRENT PAGE OPENED
  // fonction mettant a jour le state de set current page
  // et le state du type
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  // arrondis au nombre le plus pres la longeur de filterd events divisé par 9, + 1
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;

  // list of types for slide down
  const typeList = new Set(data?.events.map((event) => event.type));

  // TODO: create function that makes event section function, se baser sur filter, find et P6
  // ideas: add event listener to select selections, add a key or id to each selection option
  // as an event, create a function that makes only events linked to select displayable

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          {/* explain what is done inside the props */}
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {/* Fetch events */}
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.data)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default EventList;
