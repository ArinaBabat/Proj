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
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [loading3, setLoading3] = useState(true)
  const [loading4, setLoading4] = useState(true)
  useEffect(() => {
    fetchTimetable().then(data => { timet.setTim(data); setLoading1(false) })
    fetchCabinet().then(data => { timet.setCab(data); setLoading2(false) })
    fetchDoctor().then(data => { timet.setDoc(data); setLoading3(false) })
    fetchSpeciality().then(data => { timet.setSpec(data); setLoading4(false) })
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
          <th>День недели</th>
          <th>Начало приёма</th>
          <th>Конец приёма</th>
          <th>Кабинет</th>
          </tr>
        </thead>
        <tbody>
            {!loading1 && !loading2 && !loading3 && !loading4 && timet && timet.tim && timet.tim.rows && timet.tim.rows.map(tim =>
          <tr
            key={tim.timetable_id}
          >
          <td>{timet.spec.find((s) => { return s.speciality_id === timet.doc.rows.find((d) => { return d.doctor_id === tim.doctorDoctorId }).specialitySpecialityId }).name }</td>
          <td>{timet.doc.rows.find((d) => { return d.doctor_id === tim.doctorDoctorId }).first_name} {timet.doc.rows.find((d) => { return d.doctor_id === tim.doctorDoctorId }).last_name}</td>
          <td>{tim.day}</td>
          <td>{tim.start_of_admission/60}:{tim.start_of_admission%60||"00"}</td>
          <td>{tim.end_of_reception/60}:{tim.end_of_reception%60||"00"}</td>
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
