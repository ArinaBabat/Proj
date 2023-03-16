import { $authHost, $host } from "../../http/index";
import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {Context} from "../../index";
import {fetchCabinet, fetchDoctor} from "../../http/timAPI";
//import {observer} from "mobx-react-lite";

const CreateTim = ({show, onHide}) => {
  const {timet} = useContext(Context)
  const[day,setDay] = useState('')
  const [start, setStart] = useState('');
  const [stop, setStop] = useState('');
  const [doc, setDoc] = useState('');
  const [cab, setCab] = useState("1");
  useEffect(() => {
        fetchCabinet().then(data => timet.setCab(data))
        fetchDoctor().then(data => timet.setDoc(data))
    }, [])

  const addTim = async () =>{
    if (day === '' || start === '' || stop === '' || doc === '' || cab === '') {
      alert('Необходимо заполнить все поля');
      return
    }
    let data = await $authHost.post('api/timetable/create', { day, start_of_admission:start, end_of_reception:stop, cabinetCabinetId:cab, doctorDoctorId: doc })
    setDay('');
    setStart('');
    setStop('');
    setDoc('');
    setCab('');
  }


    return (
        <Modal
           show={show}
            onHide={onHide}
            centered
        >
        <Modal.Header closeButton onClick={onHide}>
            <Modal.Title id="contained-modal-title-vcenter">
                Добавить
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Select className="mt-4 mb-2" value={day} onChange={e => {
              setDay(e.target.value);}}>
              <option>Выбpaть день</option>
              <option value="Понедельник">Понедельник</option>
              <option value="Вторник">Вторник</option>
              <option value="Среда">Среда</option>
              <option value="Четверг">Четверг</option>
              <option value="Пятница">Пятница</option>
              <option value="Суббота">Суббота</option>
              <option value="Воскресенье">Воскресенье</option>
            </Form.Select>
                <Form.Control
                className="mt-4 p-2"
                value={start}
                onChange={e => {
                  setStart(e.target.value);
                }}
                    placeholder={"Начало приёма"}
                />
                <Form.Control
                className="mt-4 p-2"
                value={stop}
                onChange={e => {
                  setStop(e.target.value);
                }}
                    placeholder={"Конец приёма"}
                />
                <Form.Select className="mt-4 mb-2">
                  <option>Выбpaть врача</option>
                  {timet.doc.map(doc =>
                                <option
                                    onClick={() => timet.setDoc(doc)}
                                    key={doc.id}
                                >
                                    {doc.first_name, doc.last_name}
                                </option>
                            )}
                </Form.Select>
                <Form.Select className="mt-4 mb-2">
                  <option>Выбpaть кабинет</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </Form.Select>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-success" onClick={addTim} >Добавить</Button>
        </Modal.Footer>
        </Modal>
    );
};

export default CreateTim;
