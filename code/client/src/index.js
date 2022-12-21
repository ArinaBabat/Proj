import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserHospital from "./hospital/userhospital";
export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserHospital(),
    }}>
      <App />
    </Context.Provider>,
  document.getElementById('root')
);
