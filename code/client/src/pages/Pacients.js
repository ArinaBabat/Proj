import React, {useContext, useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import {useNavigate} from 'react-router-dom'
import {PRESCRIPTIONS_ROUTE} from "../utils/consts";
import {fetchTimetable, fetchCabinet, fetchSpeciality, fetchDoctor} from "../http/timAPI";
import {Context} from "../index";

const Pacients = () => {
  const navigate = useNavigate()
  const {timet} = useContext(Context)
  useEffect(() => {
        fetchTimetable().then(data => timet.setTimetable(data))
        fetchCabinet().then(data => timet.setCabinet(data))
        fetchDoctor().then(data => timet.setDoctor(data))
        fetchSpeciality().then(data => timet.setSpec(data))
    }, [])
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>mail</th>
          <th>Адрес</th>
        </tr>
      </thead>
      <tbody>
        {timet.doc && timet.doc.rows && timet.doc.rows.map(doc =>
                          <tr
                              key={doc.doctor_id}
                              value={doc.doctor_id}
                          >
                          <td>1</td>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                      )}
      </tbody>
    </Table>
  );
};
export default Pacients;
