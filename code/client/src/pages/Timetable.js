import React, {useContext, useState, useEffect} from 'react';
import {Container, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Table from 'react-bootstrap/Table';
import {fetchTimetable, fetchCabinet, fetchSpeciality, fetchDoctor} from "../http/timAPI";

const Timetable = observer(() => {
  const {timet} = useContext(Context)
  useEffect(() => {
        fetchTimetable(null, null, null, 1, 2).then(data => {
          timet.setTim(data.rows)
        })
        fetchCabinet().then(data => timet.setCab(data))
        fetchDoctor().then(data => timet.setDoc(data))
        fetchSpeciality().then(data => timet.setSpec(data))
    }, [])
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight*1.25}}
      >
      <div>

      <Table responsive="md">
        <thead>
          <tr>
          <th>Специальность</th>
          <th>Врач</th>
          <th>День недели</th>
          <th>Начало приёма</th>
          <th>Конец приёма</th>
          <th>Кабинет</th>
          </tr>
        </thead>
        <tbody>
        {timet && timet.tim && timet.tim.rows && timet.tim.rows.map(tim =>
          <tr
            key={tim.timetable_id}
          >
          <td>{}</td>
          <td>{tim.doc.first_name} {tim.doc.last_name}</td>
          <td>{tim.day}</td>
          <td>{tim.start_of_admission}</td>
          <td>{tim.end_of_reception}</td>
          <td>{tim.cabinetCabinetId}</td>
        </tr>
        )}
        </tbody>
      </Table>
    </div>
    </Container>
  );
});
export default Timetable;
