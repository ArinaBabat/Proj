import { $authHost, $host } from "../http/index";
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Context } from "../index";
import { fetchDoctor, fetchTimetable } from "../http/timAPI";


const NewRecord = () => {
  const { timet } = useContext(Context)
  const [tim, setTim] = useState('');
  const [time, setTime] = useState("");
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)
  useEffect(() => {
    fetchTimetable().then(data => { timet.setTim(data); console.log(data); setLoading1(false) })
    fetchDoctor().then(data => { timet.setDoc(data); console.log(data); setLoading2(false) })
  }, [])

  const addRec = async () => {
    if (tim === '' || time === '') {
      alert('Необходимо заполнить все поля');
      return
    }
    try {
      let data = await $authHost.post('api/record/create', { timetableTimetableId: tim, doctorDoctorId: timet.tim.rows.find((t) => { return t.timetable_id == tim }).doctorDoctorId, time })
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
          {timet && timet.tim && timet.tim.rows && timet.tim.rows.map(tim =>
            <option
              onClick={() => timet.setTim(tim)}
              key={tim.timetable_id}
              value={tim.timetable_id}
            >
              {tim.timetable_id}, {tim.day}, начало: {tim.start_of_admission}, конец: {tim.end_of_reception}
            </option>
          )}
    </Form.Select>
        <Form.Control
          className="mt-4 p-2"
          value={time}
          onChange={e => {
            setTime(e.target.value);
          }}
          placeholder={"Начало приёма"}
        />
        <Button className="mt-4 p-2" variant="outline-primary" onClick={addRec}>Записаться</Button>
    </Form>
    </>
  );
};
export default NewRecord;
