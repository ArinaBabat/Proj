import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PacientHospital from "./hospital/pacienthospital";
import DocHospital from "./hospital/dochospital";
import CabHospital from "./hospital/cabhospital";
import PresHospital from "./hospital/preshospital";
import RecHospital from "./hospital/rechospital";
import SpecHospital from "./hospital/spechospital";
import TimHospital from "./hospital/timhospital";
export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    pacient: new PacientHospital(),
    doc: new DocHospital(),
    }}>
      <App />
    </Context.Provider>,
  document.getElementById('root')
);
