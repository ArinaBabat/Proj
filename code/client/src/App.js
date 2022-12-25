import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check,dcheck,pcheck} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
  const {doc} = useContext(Context)
  const {pacient} = useContext(Context)
  const [loading, setLoading] = useState(true)
  check().then( tab => {
    if (tab){
      useEffect(() => {
        dcheck().then(data => {
          doc.setDoc(true)
          if (data.role === "DOCTOR"){
            doc.setIsDoc(true)
          }
          if (data.role === "HEAD_PHYSICIAN"){
            doc.setIsDoc(true)
            doc.setIsHp(true)
          }
        }).finally(() => setLoading(false))
      }, [])
    }else{
      useEffect(() => {
        pcheck().then(data=> {
          pacient.setPacient(true)
          pacient.setIsAuth(true)
        }).finally(() => setLoading(false))
      }, [])
    }
  })

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
