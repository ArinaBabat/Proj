import { $authHost, $host } from "../http/index";
import React, {useContext, useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import {useNavigate} from 'react-router-dom'
import {PRESCRIPTIONS_ROUTE} from "../utils/consts";
import {fetchTimetable, fetchCabinet, fetchSpeciality, fetchDoctor} from "../http/timAPI";
import {Context} from "../index";

const Pacients = () => {
  const {doct} = useContext(Context);
    const data = $authHost.get('api/doctor/pacients',doct.doc.id)
    console.log(data)
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
        {data.rows && data.rows.map(data =>
                          <tr
                              key={data.pacient_id}
                          >
                          <td>{data.first_name}</td>
                          <td>{data.last_name}</td>
                          <td>{data.mail}</td>
                          <td>{data.address}</td>
                        </tr>
                      )}
      </tbody>
    </Table>
  );
};
export default Pacients;
