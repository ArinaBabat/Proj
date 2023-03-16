//import { $authHost, $host } from "../../http/index";
import React, {useContext, useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {Context} from "../index";
import {fetchTimetable, fetchCabinet, fetchDoctor} from "../http/timAPI";

const MyTimetable = () => {
  const {timet} = useContext(Context)
  useEffect(() => {
        fetchCabinet().then(data => timet.setCab(data))
        fetchDoctor().then(data => {timet.setDoc(data); console.log(data)})
        fetchTimetable().then(data => timet.tim())
    }, [])
  return (
    <Table striped>
      <thead>
        <tr>
          <th>День недели</th>
          <th>Начало приёма</th>
          <th>Конец приёма</th>
          <th>Кабинет</th>
          <th>Количество записей</th>
        </tr>
      </thead>
      <tbody>
        {timet.tim && timet.tim.rows && timet.tim.rows.map(tim =>
        <tr >
          <td>Понедельник</td>
          <td>{tim.start_of_admission||"---"}</td>
          <td>{tim.end_of_admission||"---"}</td>
          <td>{tim.cabinetCabinetId||"---"}</td>
          <td>@mdo</td>
        </tr>

      )}
      </tbody>
    </Table>
  );
};
export default MyTimetable;
