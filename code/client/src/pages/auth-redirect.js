import {plogin} from "../http/userAPI";
import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {TIMETABLE_ROUTE} from "../utils/consts";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

const LoginSuccess = observer(() => {
  console.log("1")
  const navigate = useNavigate();
console.log("2")
  useEffect(() => {
    console.log("3")
    setTimeout(() => {
      console.log("4")
    const psignIn = async () =>{
      console.log("5")
      try {
        let pacient;
        console.log("pacient")
        pacient = await plogin()
        console.log(pacient)
        pacient.setUser(pacient);
        pacient.setIsAuth(true)
        navigate(TIMETABLE_ROUTE)
      }catch (e) {
        alert(e.response.data.message);
      }
    };
    console.log("?")
  }, 1000)
  }, [])

  return (
    <div>
      <h2>Добро пожаловать!</h2>
    </div>
  );
}
);

export default LoginSuccess;
