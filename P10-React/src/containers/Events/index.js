import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
// import { getMonth } from "../../helpers/Date";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";
import "./style.css";

const PER_PAGE = 9;

function EventList() {
  // FETCH DATA PROP
  // usecontext data hook, with error handling if event is not found
  const { data, error } = useData();
  // TYPE OF EVENT
  // state for the type of event
  const [type, setType] = useState();
  // CURRENT PAGE
  // state for the current page that appears
  const [currentPage, setCurrentPage] = useState(1);

  // OLD VARIABLE, RETURNS ARRAY THAT FILTERS DATA
  // if type, show event, else events, or array,
  // filter returns an array that meets conditions
  // const filteredEvents = ((!type ? data?.events : data?.events) || []).filter(
  //   (event, index) => {
  //     if (
  // if currentPage - 1, multiplied by per_page (9) inferior or equal to index,
  // render per page(9) multiplied by currentpage superior to index
  //   (currentPage - 1) * PER_PAGE <= index &&
  //   PER_PAGE * currentPage > index
  // ) {
  // if condition is met, return true, else false
  //       return true;
  //     }
  //     return false;
  //   }
  // );

  // Filtre les événements en fonction du type
  // prend en paramettre les data events (si c'est faux, tableau vide)
  // method filtre retourne tout les elements du tableau data.events ayant un un type
  // si le type est indefni ou nul on retourne le type du event qui correspond au type
  const allFilteredEvents = (data?.events || []).filter(
    (event) => !type || event.type === type
  );

  // la pagination des events, definit nombre d'events par page
  // extrait les elements du tableau correspondant a la page actuelle en 2 parammetre definissant debut et fin de l'indice
  // ex: page 1 elements events de 0 a 9, page 2 de 9 a 18 et etc
  const paginatedEvents = allFilteredEvents.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  // UPDATE STATE AND TYPE OF CURRENT PAGE OPENED
  // fonction mettant a jour le state de set current page
  // et le state du type
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  // const find = filteredEvents.filter

  // arrondis au nombre le plus pres la longeur de filterd events divisé par 9, + 1
  const pageNumber =
    Math.floor((allFilteredEvents?.length || 0) / PER_PAGE) + 1;

  // list of types for slide down
  const typeList = new Set(data?.events.map((event) => event.type));

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
            value={type}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {/* Fetch events */}
            {/* problem with date */}
            {paginatedEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          {/* pagnation */}
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
