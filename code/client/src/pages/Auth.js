import React, {useContext, useState,useEffect} from 'react';
import {Container, Form, Card} from 'react-bootstrap'
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {PACIENT_REGISTRATION_ROUTE,PACIENT_LOGIN_ROUTE, DOCTOR_LOGIN_ROUTE, TIMETABLE_ROUTE} from "../utils/consts";
import {plogin,dlogin, registration} from "../http/userAPI";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {fetchTimetable, fetchCabinet, fetchSpeciality, fetchDoctor} from "../http/timAPI";

const Auth = observer( () => {
  const {doct} = useContext(Context)
  const location = useLocation()
  const isDoct = location.pathname === DOCTOR_LOGIN_ROUTE
  const [doctor_id, setId] = useState('')
  const [dpassword, dsetPassword] = useState('')
  const navigate = useNavigate()
  const {timet} = useContext(Context)

  const {pacient} = useContext(Context);
  const isLogin = location.pathname === PACIENT_LOGIN_ROUTE;
  const [name, setName] = useState("");
  const [last_name, setLast_name] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
        fetchDoctor().then(data => {
          timet.setDoc(data.rows)
        })

    }, [])
  const click = async () => {
    window.location.replace(
      "http://localhost:5000/api/pacient/login/"
    );
  };

  const dsignIn = async () =>{
    try {
      let doctor;
      doctor = await dlogin(doctor_id, dpassword)
      console.log(doctor)
      doct.setDoc(doctor);
      doct.setIsDoc(true)
      if (doctor.role === "HEAD_PHYSICIAN"){doct.setIsHp(true)}
      window.location.replace("http://localhost:3000/");
    }catch (e) {
      alert(e.response.data.message);
    }
  };
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
        value={dpassword}
        onChange = {e => {
          dsetPassword(e.target.value)}}
        type="password"
      />
      <Button
        className="mt-3"
        variant={"outline-success"}
        onClick={dsignIn}
      >
        Войти
      </Button>
      </Form>
      </Card>
    :
    <Container>
    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
    <Button variant={"outline-success"} onClick={click}>
                { "Войти через ВКонтакте"}
               </Button>
          </Row>
   </Container>
  }
</Container>
);

});
export default Auth;   //здесь
