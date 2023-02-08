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
  const [ppassword, psetPassword] = useState('')
  useEffect(() => {
        fetchDoctor().then(data => {
          timet.setDoc(data.rows)
          //console.log('data: ',data)
        })
        //console.log('timet.doc: ',timet.doc)
    }, [])
    //console.log('timet.doc: ',timet.doc)
  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await plogin(phone, ppassword);
      } else {
       const formData = new FormData()
         formData.append('first_name', name)
         formData.append('last_name', last_name)
         formData.append('ppassword', ppassword)
         formData.append('address', address)
         formData.append('doctorDoctorId', timet.selectedDoc.doctor_id)
         formData.append('phone', phone)
        data = await registration(formData);
      }
      pacient.setPacient(data);
      pacient.setIsAuth(true);
      navigate(TIMETABLE_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const dsignIn = async () =>{
    try {
      let doctor;
      doctor = await dlogin(doctor_id, dpassword)
      console.log(doctor)
      doct.setDoc(doctor);
      doct.setIsDoc(true)
      if (doctor.role === "HEAD_PHYSICIAN"){doct.setIsHp(true)}
      navigate(TIMETABLE_ROUTE)
    }catch (e) {
      alert(e.response.data.message);
    }
  };
  //console.log(timet.selectedDoc)
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
    <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          {isLogin ? (
            <Container>
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш телефон..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш пароль..."
                value={ppassword}
                onChange={(e) => psetPassword(e.target.value)}
                type="password"
              />
            </Container>
          ) : (
            <Container>
              <Form.Control
                className="mt-3"
                placeholder="Введите ваше имя..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Введите вашу фамилию..."
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш телефон..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш адрес..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш пароль..."
                value={ppassword}
                onChange={(e) => psetPassword(e.target.value)}
                type="password"
              />
              <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{timet.selectedDoc.last_name||"Выберите лечащего врача"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {timet.doc.map( doc =>
                                <Dropdown.Item
                                    onClick={() => timet.setSelectedDoc(doc)}
                                    key={doc.doctor_id}
                                >
                                  {doc.last_name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>


              <div id="signInDiv"></div>

            </Container>
          )}

          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                <NavLink to={PACIENT_REGISTRATION_ROUTE}>Регистрация</NavLink>
              </div>
            ) : (
              <div>
                <NavLink to={PACIENT_LOGIN_ROUTE}>Вход</NavLink>
              </div>
            )}
            <Button variant={"outline-success"} onClick={click}>
              {isLogin ? "Войти" : "Регистрация"}
            </Button>
          </Row>
        </Form>
      </Card>
  }
</Container>
);

});
export default Auth;
