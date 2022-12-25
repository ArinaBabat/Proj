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
  //try{
  //check().then( tab => {
    //if (tab){
      useEffect(() => {
        dcheck().then(data => {
          doc.setDoc(data)
          if (data.role === "DOCTOR"){
            doc.setIsDoc(true)
          }
          if (data.role === "HEAD_PHYSICIAN"){
            doc.setIsDoc(true)
            doc.setIsHp(true)
          }
        }).finally(() => setLoading(false))
      }, [])
    //}else{
      useEffect(() => {
        pcheck().then(data=> {
          pacient.setUser(data)
          pacient.setIsAuth(true)
        }).finally(() => setLoading(false))
      }, [])
    //}})
//}  catch (e) {
//        setLoading(false)
//        pacient.setIsAuth(false)
//        doc.setIsDoc(false)
//        doc.setIsHp(false)
//    }

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
