import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {dcheck} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
  const {doct} = useContext(Context)
  const {pacient} = useContext(Context)
  const [loading, setLoading] = useState(true)
      useEffect(() => {
        dcheck().then(data => {
          doct.setDoc(data)
          if (data.role === "DOCTOR"){
            doct.setIsDoc(true)
          } else if (data.role === "HEAD_PHYSICIAN"){
              doct.setIsDoc(true)
              doct.setIsHp(true)
            }
        }).finally(() => setLoading(false))
      }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
