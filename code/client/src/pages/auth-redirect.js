import {plogin} from "../http/userAPI";
import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
//import {Context} from "../index";
import {TIMETABLE_ROUTE} from "../utils/consts";
import {NavLink, useLocation, useNavigate} from "react-router-dom";


const LoginSuccess = observer(() => {
//  const {pacient} = useContext(Context);
//  const context = useContext();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
    const dsignIn = async () =>{
      try {
        let pacient;
        pacient = await plogin()
        console.log(pacient)
        pacient.setUser(pacient);
        pacient.setIsAuth(true)
        navigate(TIMETABLE_ROUTE)
      }catch (e) {
        alert(e.response.data.message);
      }
    };}, 1000)
  }, [])

  return (
    <div>
      <h2>Добро пожаловать!</h2>
    </div>
  );
}
);

export default LoginSuccess;
