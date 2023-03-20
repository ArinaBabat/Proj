//import { $authHost, $host } from "../../http/index";
import React, {useContext, useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import Modal from "react-bootstrap/Modal";
import {Container, Form, Button} from "react-bootstrap";
import {Context} from "../index";
import {fetchTimetable, fetchCabinet, fetchDoctor, fetchSpeciality} from "../http/timAPI";
import { MY_RECORDS_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';

const MyTimetable = () => {
  const { doct } = useContext(Context)
  const navigate = useNavigate()
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [loading3, setLoading3] = useState(true)
  const [loading4, setLoading4] = useState(true)
  const [tims, setTims] = useState(null);
  const [specs, setSpecs] = useState(null);
  const [docs, setDocs] = useState(null);
  const [cabs, setCabs] = useState(null);
  useEffect(() => {
    fetchTimetable(undefined, undefined, doct.doc.id).then(data => { setTims(data.rows); setLoading1(false) })
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
              <th>Дата</th>
              <th>Начало приёма</th>
              <th>Конец приёма</th>
              <th>Кабинет</th>
            </tr>
          </thead>
          <tbody>
            {cabs && specs && docs && tims && tims.map(tim =>
              <tr key={tim.timetable_id}>
                <td>{(new Date(tim.start)).toDateString()}</td>
                <td>{(new Date(tim.start)).toTimeString()}</td>
                <td>{(new Date(tim.end)).toTimeString()}</td>
                <td>{cabs.find((cab) => {
                  return tim.cabinetCabinetId === cab.cabinet_id
                }).number}</td>
                <td><Button onClick={() => navigate(MY_RECORDS_ROUTE + `/${tim.timetable_id}`)}>Записи</Button></td>
              </tr>
            )}
          </tbody>
        </Table>

    </div>
    </Container>
  );
};
export default MyTimetable;
