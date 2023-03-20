import React, {useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Context} from "../index";
import {TIMETABLE_ROUTE,DOCTOR_PACIENTS_ROUTE,HEAD_PHYSICIAN_ROUTE,PACIENT_LOGIN_ROUTE,DOCTOR_LOGIN_ROUTE,DOCTOR_TIMETABLE_ROUTE,PRESCRIPTIONS_ROUTE,NEW_RECORD_ROUTE,PACIENT_RECORDS_ROUTE,PACIENT_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import {$authHost, $host} from "../index";
import {plogout} from "../http/userAPI";

const NavBar = observer( () => {
  const {pacient} = useContext(Context)
  const {doct} = useContext(Context)
  const navigate = useNavigate()


 
  const logOutD = () => {
          doct.setDoc({})
          doct.setIsDoc(false)
          doct.setIsHp(false)
          localStorage.setItem('token', '')
          navigate(TIMETABLE_ROUTE)
      }
      const logOutP = () => {
              pacient.setUser({})
              pacient.setIsAuth(false)
              //localStorage.setItem('token', '')
              plogout()
              navigate(TIMETABLE_ROUTE)
          }

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Button size="lg"  onClick={() => navigate(TIMETABLE_ROUTE)}>Синяя птица</Button>
        {doct.isHp ?
          <Nav className="ml-auto">
            <Button onClick={() => navigate(HEAD_PHYSICIAN_ROUTE)}>Управление</Button>
            <Button onClick={() => navigate(DOCTOR_TIMETABLE_ROUTE)}>Моё расписание</Button>
            <Button onClick={() => navigate(DOCTOR_PACIENTS_ROUTE)}>Мои пациенты</Button>
            <Button onClick={() => logOutD()}>Выход</Button>
            </Nav>
            :
            doct.isDoc ?
              <Nav className="ml-auto">
            <Button onClick={() => navigate(DOCTOR_TIMETABLE_ROUTE)}>Моё расписание</Button>
            <Button onClick={() => navigate(DOCTOR_PACIENTS_ROUTE)}>Мои пациенты</Button>
            <Button onClick={() => logOutD()}>Выход</Button>
            </Nav>
          :
          pacient.isAuth ?
            <Nav className="ml-auto">

              <Button onClick={() => navigate(NEW_RECORD_ROUTE)}>Запись к врачу</Button>
              <Button onClick={() => navigate(PACIENT_RECORDS_ROUTE)}>Предстоящие записи</Button>
              <Button onClick={() => navigate(PACIENT_ROUTE)}>Личный кабинет</Button>
              <Button onClick={() => navigate(PRESCRIPTIONS_ROUTE)}>Мои диагнозы</Button>
              <Button onClick={() => logOutP()}>Выход</Button>
            </Nav>
          :
          <Nav className="ml-auto">
            <Button onClick={() => navigate(PACIENT_LOGIN_ROUTE)}>Авторизация</Button>
            <Button onClick={() => navigate(DOCTOR_LOGIN_ROUTE)}>Для персонала</Button>
          </Nav>
        }
      </Container>
    </Navbar>
  );
});
export default NavBar;
