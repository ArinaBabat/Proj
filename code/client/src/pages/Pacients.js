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
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr onClick={() => navigate(PRESCRIPTIONS_ROUTE + '/1')}>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr onClick={() => navigate(PRESCRIPTIONS_ROUTE + '/2')}>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr onClick={() => navigate(PRESCRIPTIONS_ROUTE + '/3')}>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
};
export default Pacients;
