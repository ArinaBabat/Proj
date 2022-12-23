import React, {useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Context} from "../index";
import {TIMETABLE_ROUTE,DOCTOR_PACIENTS_ROUTE,HEAD_PHYSICIAN_ROUTE,PACIENT_LOGIN_ROUTE,DOCTOR_LOGIN_ROUTE,DOCTOR_TIMETABLE_ROUTE,PRESCRIPTIONS_ROUTE,NEW_RECORD_ROUTE,PACIENT_RECORDS_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import {$authHost, $host} from "../index";

const NavBar = observer( () => {
  const {user} = useContext(Context)
  const navigate = useNavigate()

  const logOut = () => {
          user.setUser({})
          user.setIsAuth(false)
          user.setIsDoc(false)
          user.setIsHp(false)
          //const {data} = await $host.post('api/doctor/login', {doctor_id, password})
          localStorage.setItem('token', '')
          navigate(TIMETABLE_ROUTE)
      }

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Button size="lg"  onClick={() => navigate(TIMETABLE_ROUTE)}>Синяя птица</Button>
        {user.isHp ?
          <Nav className="ml-auto">
            <Button onClick={() => navigate(HEAD_PHYSICIAN_ROUTE)}>Управление</Button>
            <Button onClick={() => navigate(DOCTOR_TIMETABLE_ROUTE)}>Моё расписание</Button>
            <Button onClick={() => navigate(DOCTOR_PACIENTS_ROUTE)}>Мои пациенты</Button>
            <Button onClick={() => logOut()}>Выход</Button>
            </Nav>
            :
            user.isDoc ?
              <Nav className="ml-auto">
            <Button onClick={() => navigate(DOCTOR_TIMETABLE_ROUTE)}>Моё расписание</Button>
            <Button onClick={() => navigate(DOCTOR_PACIENTS_ROUTE)}>Мои пациенты</Button>
            <Button onClick={() => logOut()}>Выход</Button>
            </Nav>
          :
          user.isAuth ?
            <Nav className="ml-auto">
              <Button onClick={() => navigate(PRESCRIPTIONS_ROUTE)}>Мои назначения</Button>
              <Button onClick={() => navigate(NEW_RECORD_ROUTE)}>Запись к врачу</Button>
              <Button onClick={() => navigate(PACIENT_RECORDS_ROUTE)}>Предстоящие записи</Button>
              <Button onClick={() => logOut()}>Выход</Button>
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
