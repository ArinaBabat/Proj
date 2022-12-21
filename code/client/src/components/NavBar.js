import React, {useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Context} from "../index";
import {TIMETABLE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";
import {Button} from "react-bootstrap";

const NavBar = observer( () => {
  const {user} = useContext(Context)
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Button size="lg" to={TIMETABLE_ROUTE}>Синяя птица</Button>
        {user.isDoc ?
          <Nav className="ml-auto">
            <Button>Моё расписание</Button>
            <Button>Мои пациенты</Button>
            <Button onClick={() => user.setIsAuth(false), () => user.setIsDoc(false)}>Выход</Button>
          </Nav>
          :
          user.isAuth ?
            <Nav className="ml-auto">
              <Button>Мои назначения</Button>
              <Button>Запись к врачу</Button>
              <Button>Предстоящие записи</Button>
              <Button onClick={() => user.setIsAuth(false)}>Выход</Button>
            </Nav>
          :
          <Nav className="ml-auto">
            <Button onClick={() => user.setIsAuth(true)}>Авторизация</Button>
          </Nav>
        }
      </Container>
    </Navbar>
  );
});
export default NavBar;
