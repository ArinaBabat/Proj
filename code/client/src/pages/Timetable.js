import React, {useContext, useState, useEffect} from 'react';
import {Container, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Table from 'react-bootstrap/Table';
import {fetchTimetable, fetchCabinet, fetchSpeciality, fetchDoctor} from "../http/timAPI";

const Timetable = observer(() => {
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [loading3, setLoading3] = useState(true)
  const [loading4, setLoading4] = useState(true)
  const [tims, setTims] = useState(null);
  const [specs, setSpecs] = useState(null);
  const [docs, setDocs] = useState(null);
  const [cabs, setCabs] = useState(null);
  useEffect(() => {
    fetchTimetable().then(data => { setTims(data.rows); setLoading1(false) })
    fetchCabinet().then(data => { setCabs(data.rows); setLoading2(false) })
    fetchDoctor().then(data => { setDocs(data.rows); setLoading3(false) })
    fetchSpeciality().then(data => { setSpecs(data); setLoading4(false) })
    }, [])
  return (
    <Container
      className="mt-4 mb-2"
      style={{height: window.innerHeight*1.25}}
      >
      <div>

      <Table responsive="md">
        <thead>
          <tr>
          <th>Специальность</th>
          <th>Врач</th>
          <th>Дата</th>
          <th>Начало приёма</th>
          <th>Конец приёма</th>
          <th>Кабинет</th>
          </tr>
        </thead>
        <tbody>
          {cabs && specs && docs && tims && tims.map(tim =>
          <tr key={tim.timetable_id}>
              <td>
                {specs.find((spec) => { 
                  return spec.speciality_id === docs.find((doc) => { 
                    return doc.doctor_id === tim.doctorDoctorId 
                  }).specialitySpecialityId 
                }).name}
              </td>
              <td>
                {
                docs.find((doc) => { 
                  return doc.doctor_id === tim.doctorDoctorId }).first_name} {
                docs.find((doc) => { 
                  return doc.doctor_id === tim.doctorDoctorId }).last_name}
              </td>
              <td>{(new Date(tim.start)).toDateString()}</td>
              <td>{(new Date(tim.start)).toTimeString()}</td>
              <td>{(new Date(tim.end)).toTimeString()}</td>
              <td>{cabs.find((cab) => {
                return tim.cabinetCabinetId === cab.cabinet_id
                }).number}</td>
          </tr>
        )}
        </tbody>
      </Table>
    </div>
    </Container>
  );
});
export default Timetable;
