import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// * Custom react hook

// ! explain context hook
// CREATE CONTEXT
// context component is way to pass down data that is shared and accesible accross diferent compoinents, without passing it through multiple props manually
// context hook is insitialised with an initial value
const DataContext = createContext({});

// api fetch function, fetching the json events
export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

// children props in dataprovider, with any type
export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  // le useCallback permet de ne pas re render le code present à certaines conditions
  // re render le component que lorsque la dépendence change
  const getData = useCallback(async () => {
    // error handling
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
    // dependence vide donc la fonction n'est crée qu'une seule fois durant la durée de vie du component
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });

  return (
    // PROVIDE CONTEXT
    // here context is provided with the values data and error
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// CONSUME CONTEXT
// custom hook useData, arrowed function to useContext method takes into parameter, DataContext varaible that initisalised the contexted
export const useData = () => useContext(DataContext);

export default DataContext;
