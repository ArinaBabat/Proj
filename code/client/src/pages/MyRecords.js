import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../index";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchTimetable, fetchCabinet, fetchSpeciality, fetchDoctor } from "../http/timAPI";
import { $authHost, $host } from "../http/index";


const MyRecords = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const { timet } = useContext(Context)
  const { pacient } = useContext(Context)
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [loading3, setLoading3] = useState(true)
  const [loading4, setLoading4] = useState(true)
  const [loading5, setLoading5] = useState(true)
  const [todel, setTodel] = useState(null)
  const [rec, setRec] = useState(null)
  const fetchRecords = async (pacient_id) => {
    const { data } = await $authHost.get(`api/record/?pacientPacientId=${pacient_id}`,)
    return data;
  }
  useEffect(() => {
    fetchRecords(pacient.user.pacient_id).then(data => { setRec(data); setLoading1(false) })
    fetchCabinet().then(data => { timet.setCab(data); setLoading2(false) })
    fetchDoctor().then(data => { timet.setDoc(data); setLoading3(false) })
    fetchSpeciality().then(data => { timet.setSpec(data); setLoading4(false) })
    fetchTimetable().then(data => { timet.setTim(data); console.log(data); setLoading5(false) })
  }, [])
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Время</th>
            <th>Имя пациента</th>
            <th>Фамилия пациента</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!loading1 && !loading2 && !loading3 && !loading4 && !loading5 && timet && rec && rec.rows && rec.rows.map(r =>
            <tr
              key={r.record_id}
            >

              <td><Button variant="outline-primary" >
                Написать заключение
              </Button>
                </td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }

export default MyRecords;
