import React, {useContext, useState} from 'react';
import {Container, Form, Card} from 'react-bootstrap'
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {DOCTOR_LOGIN_ROUTE, TIMETABLE_ROUTE} from "../utils/consts";
import {login} from "../http/userAPI";

const Auth = observer( () => {
  const {user} = useContext(Context)
  const location = useLocation()
  const isDoct = location.pathname === DOCTOR_LOGIN_ROUTE
  const [doctor_id, setId] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signIn = async () =>{
    try {
      let doctor;
      doctor = await login(doctor_id, password)
      console.log(doctor)
      user.setUser(doctor)
      user.setIsAuth(true)
      user.setIsDoc(true)
      if (doctor.role === "HEAD_PHYSICIAN"){user.setIsHp(true)}
      navigate(TIMETABLE_ROUTE)
    }catch (e) {
      alert(e.response.data.message)
    }

  }

  return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight}}
      >
      {isDoct ?
      <Card style={{width: 600}} className="p-5">
        <h2 className="m-auto">Авторизация</h2>
      <Form className="d-flex flex-column">
      <Form.Control
        className="mt-3"
        placeholder="Введите ваш логин..."
        value={doctor_id}
        onChange={e => {
          setId(e.target.value)
        }}
      />
      <Form.Control
        className="mt-3"
        placeholder="Введите ваш пароль..."
        value={password}
        onChange = {e => {
          setPassword(e.target.value)}}
        type="password"
      />
      <Button
        className="mt-3"
        variant={"outline-success"}
        onClick={signIn}
      >
        Войти
      </Button>
      </Form>
      </Card>

    :
    <Button
      className="mt-3"
      variant={"outline-success"}

    >
      dd
    </Button>

  }
</Container>
);

});
export default Auth;
