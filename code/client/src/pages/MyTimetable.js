//import { $authHost, $host } from "../../http/index";
import React, {useContext, useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {Context} from "../index";
import {fetchTimetable, fetchCabinet, fetchDoctor} from "../http/timAPI";

const MyTimetable = () => {
  const { timet } = useContext(Context)
  const { doct } = useContext(Context)
  const [loading, setLoading] = useState(0)
  useEffect(() => {
    fetchCabinet().then(data => { timet.setCab(data); setLoading(1) })
    fetchDoctor().then(data => { timet.setDoc(data); console.log(data); setLoading(2) })
    fetchTimetable(undefined, undefined, doct.doc.id).then(data => { timet.setTim(data); console.log(data); setLoading(3) })
    }, [])
  return (
    <Table striped>
      <thead>
        <tr>
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
        <td>{tim.day}</td>
        <td>{(tim.end_of_reception-tim.end_of_reception%60)}:{tim.start_of_admission%60||"00"}</td>
        <td>{(tim.end_of_reception-tim.end_of_reception%60)/60}:{tim.end_of_reception%60||"00"}</td>
        <td>{tim.cabinetCabinetId}</td>
      </tr>
      )}
      </tbody>
    </Table>
  );
};
export default MyTimetable;
