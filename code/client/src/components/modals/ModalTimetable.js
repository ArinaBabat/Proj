import { $authHost, $host } from "../../http/index";
import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {Context} from "../../index";
import {fetchCabinet, fetchDoctor, fetchSpeciality} from "../../http/timAPI";
//import {observer} from "mobx-react-lite";

const CreateTim = ({show, onHide}) => {
  const[day,setDay] = useState('')
  const [start, setStart] = useState('');
  const [stop, setStop] = useState('');
  const [doc, setDoc] = useState('');
  const [cab, setCab] = useState('');
  const [specs, setSpecs] = useState(null);
  const [docs, setDocs] = useState(null);
  const [cabs, setCabs] = useState(null);
  useEffect(() => {
        fetchCabinet().then(data => { setCabs(data); })
        fetchDoctor().then(data => { setDocs(data); })
        fetchSpeciality().then(data => { setSpecs(data); })
    }, [])

  const addTim = async () =>{
    if (day === '' || start === '' || stop === '' || doc === '' || cab === '') {
      alert('Необходимо заполнить все поля');
      return
    }
    let startObj;
    let endObj;
    try {
      startObj = new Date(day + ' ' + start + '+03');
      endObj = new Date(day + ' ' + stop + '+03');
    } catch (e) {
      alert(e.message);
    }
    try {
      let data = await $authHost.post('api/timetable/create', { start: startObj.toString(), end:endObj.toString(), cabinetCabinetId:cab, doctorDoctorId: doc });
      setDay('');
      setStart('');
      setStop('');

    } catch (e) {
      alert(e.response.data.message);
    }
    
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
            <Form.Control
              className="mt-4 p-2"
              value={day}
              onChange={e => {
                setDay(e.target.value);
              }}
              placeholder={"Дата (гггг-мм-дд)"}
            />
                <Form.Control
                className="mt-4 p-2"
                value={start}
                onChange={e => {
                  setStart(e.target.value);
                }}
                    placeholder={"Начало приёма (чч:мм)"}
                />
                <Form.Control
                className="mt-4 p-2"
                value={stop}
                onChange={e => {
                  setStop(e.target.value);
                }}
              placeholder={"Конец приёма (чч:мм)"}
                />
            <Form.Select className="mt-4 mb-2" value={doc} onChange={e => {
              setDoc(e.target.value);
            }}>
              <option value="">Выберите врача</option>
              {docs && docs.rows && docs.rows.map(doc =>
                                <option
                                    key={doc.doctor_id}
                                    value={doc.doctor_id}
                                >
                                {doc.first_name} {doc.last_name}
                                </option>
                            )}
                </Form.Select>
            {doc !== '' && specs && cabs &&  <Form.Select className="mt-4 mb-2" value={cab} onChange={e => {
              setCab(e.target.value);
            }}>
              <option value="">Выберите кабинет</option>
              {cabs && cabs.rows && cabs.rows.map(cab => 
              (cab.specialitySpecialityId === docs.rows.find(d => { return d.doctor_id == doc }).specialitySpecialityId && 
              <option
                  key={cab.cabinet_id}
                  value={cab.cabinet_id}
                >
                  №{cab.number} ({specs.find(spec => { return cab.specialitySpecialityId === spec.speciality_id }).name  })
                </option>
                )
              )}
            </Form.Select>}
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-success" onClick={addTim} >Добавить</Button>
        </Modal.Footer>
        </Modal>
    );
};

export default CreateTim;
