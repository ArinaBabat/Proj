import { pcheck } from "../http/userAPI";
import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {TIMETABLE_ROUTE} from "../utils/consts";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Context} from "../index";

const LoginSuccess = observer(() => {
  const navigate = useNavigate();
  const {pacient} = useContext(Context);
  useEffect(() => {
    setTimeout(() => {
      try {
        pcheck().then(data => {
          if (data) {
            pacient.setUser(data)
            pacient.setIsAuth(true)
          }
          navigate(TIMETABLE_ROUTE)
        })
      }catch (e) {
        alert(e.response.data.message);
      }
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
