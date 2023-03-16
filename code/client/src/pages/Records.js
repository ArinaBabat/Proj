import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../index";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchTimetable, fetchCabinet, fetchSpeciality, fetchDoctor } from "../http/timAPI";
import { $authHost, $host } from "../http/index";

function DeleteRecord(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Подтверждение
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Вы действительно хотите отменить запись?</h4>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="danger" onClick={
        async () => {
          try {
            const { data } = await $authHost.post('api/record/delete', { record_id: props.todel });
            props.onHide()
          } catch (e) {

          }
        }
        }>
          Отменить запись
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const Records = () => {
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
            <th>День</th>
            <th>Время</th>
            <th>Кабинет</th>
            <th>Специальность</th>
            <th>Врач</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!loading1 && !loading2 && !loading3 && !loading4 && !loading5 && timet && rec && rec.rows && rec.rows.map(r =>
            <tr
              key={r.record_id}
            >
              <td>{r.record_id} {timet.tim.rows.find((t) => { return t.timetable_id === r.timetableTimetableId }).day}</td>
              <td>{(r.time - r.time % 60) / 60}:{r.time % 60 || "00"}</td>
              <td>{timet.tim.rows.find((t) => { return t.timetable_id === r.timetableTimetableId }).cabinetCabinetId}</td>
              <td>{
              timet.spec.find(
                (s) => { return s.speciality_id === timet.doc.rows.find(
                  (d) => { return d.doctor_id === timet.tim.rows.find(
                    (t) => { return t.timetable_id === r.timetableTimetableId }
                  ).doctorDoctorId }
                ).specialitySpecialityId }
              ).name
              }</td>
              <td>{timet.doc.rows.find((d) => { return d.doctor_id === timet.tim.rows.find((t) => { return t.timetable_id === r.timetableTimetableId }).doctorDoctorId }).first_name} {
              timet.doc.rows.find((d) => { return d.doctor_id === timet.tim.rows.find((t) => { return t.timetable_id === r.timetableTimetableId }).doctorDoctorId }).last_name}</td>
              <td><Button variant="outline-danger" onClick={
                () => {
                  setTodel(r.record_id)
                setModalShow(true);
                }
                }>
                Отменить
              </Button>
                </td>
            </tr>
          )}
        </tbody>
        <DeleteRecord
          todel={todel}
          show={modalShow}
          onHide={() => { setModalShow(false); rec.rows = rec.rows.filter((r) => r.record_id != todel) }}
        />
      </Table>
    );
  }

export default Records;
