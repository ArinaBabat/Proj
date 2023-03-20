import { $authHost, $host } from "../http/index";
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Context } from "../index";
import { fetchTimetable, fetchCabinet, fetchSpeciality, fetchDoctor } from "../http/timAPI";


const NewRecord = () => {
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [loading3, setLoading3] = useState(true)
  const [loading4, setLoading4] = useState(true)
  const [tims, setTims] = useState(null);
  const [specs, setSpecs] = useState(null);
  const [docs, setDocs] = useState(null);
  const [cabs, setCabs] = useState(null);
  const [tim, setTim] = useState('');
  const [time, setTime] = useState('');
  useEffect(() => {
    fetchTimetable().then(data => { setTims(data.rows); setLoading1(false) })
    fetchCabinet().then(data => { setCabs(data.rows); setLoading2(false) })
    fetchDoctor().then(data => { setDocs(data.rows); setLoading3(false) })
    fetchSpeciality().then(data => { setSpecs(data); setLoading4(false) })
  }, [])

  const addRec = async () => {
    if (tim === '' || time === '') {
      alert('Необходимо заполнить все поля');
      return
    }
    let day = tims.find(t => {return t.timetable_id == tim}).start;
    let startObj;
    try {
      startObj = new Date(day.split('T')[0] + ' ' + time + '+03');
    } catch (e) {
      alert(e.message);
    }
    console.log(startObj.toString());
    try {
      let data = await $authHost.post('api/record/create', { timetableTimetableId: tim, start: startObj.toString() })
    } catch (e) {
      alert(e.response.data.message);
      return
    }
    setTim('');
    setTime('');
  }

  return (
    <>
    <Form className="mt-10 p-2">
        {false && {/*<Form.Select className="mt-4 p-2" aria-label="Default select example" value={doc} onChange={e => {
          setDoc(e.target.value);
        }}>
          <option value="">Выбор специалиста</option>
          {timet.doc && timet.doc.rows && timet.doc.rows.map(doc =>
            <option
              onClick={() => timet.setDoc(doc)}
              key={doc.doctor_id}
              value={doc.doctor_id}
            >
              {doc.first_name} {doc.last_name}
            </option>
          )}
    </Form.Select>*/}}
        <Form.Select
        className="mt-4 p-2"
        aria-label="Default select example"
        value={tim}
        onChange={e => {
          setTim(e.target.value);
        }}>
          <option value="">Выбор дня</option>
          {cabs && specs && docs && tims && tims.map(tim =>
            <option
              key={tim.timetable_id}
              value={tim.timetable_id}
            >
              {specs.find((spec) => {
                  return spec.speciality_id === docs.find((doc) => {
                    return doc.doctor_id === tim.doctorDoctorId
                  }).specialitySpecialityId
                }).name}, {
                  docs.find((doc) => {
                    return doc.doctor_id === tim.doctorDoctorId
                  }).first_name} {
                  docs.find((doc) => {
                    return doc.doctor_id === tim.doctorDoctorId
                  }).last_name}, {(new Date(tim.start)).toDateString()}, Начало: {
                (new Date(tim.start)).toTimeString()} Конец: {
                (new Date(tim.end)).toTimeString()} Кабинет: {
                  cabs.find((cab) => {
                return tim.cabinetCabinetId === cab.cabinet_id
              }).number}
            </option>
          )}
    </Form.Select>
        <Form.Control
          className="mt-4 p-2"
          value={time}
          onChange={e => {
            setTime(e.target.value);
          }}
          placeholder={"Начало приёма (чч:мм)"}
        />
        <Button className="mt-4 p-2" variant="outline-primary" onClick={addRec}>Записаться</Button>
    </Form>
    </>
  );
};
export default NewRecord;
