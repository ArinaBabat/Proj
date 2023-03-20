import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../index";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalPerscription from "../components/modals/ModalPerscription";
import { fetchTimetable, fetchCabinet, fetchSpeciality, fetchDoctor } from "../http/timAPI";
import { $authHost, $host } from "../http/index";
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Prescription(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Заключение
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Диагноз:</h4>
         {props.topre && props.topre.prescription.diagnostic}
        <h4>Терапия:</h4>
         {props.topre && props.topre.prescription.therapy}
      </Modal.Body>
    </Modal>
  );
}

const Perscriptions = () => {
  let { pacient_id: pac_param } = useParams();
  const [modalShow, setModalShow] = React.useState(false);
  const { timet } = useContext(Context)
  const { pacient } = useContext(Context)
  const { doct } = useContext(Context)
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [loading3, setLoading3] = useState(true)
  const [loading4, setLoading4] = useState(true)
  const [loading5, setLoading5] = useState(true)
  const [tims, setTims] = useState(null);
  const [specs, setSpecs] = useState(null);
  const [docs, setDocs] = useState(null);
  const [cabs, setCabs] = useState(null);
  const [topre, setTopre] = useState(null)
  const [recs, setRecs] = useState(null)
  const fetchRecords = async (pacient_id) => {
    const { data } = await $authHost.get(`api/record/?pacientPacientId=${pacient_id}`,)
    return data;
  }
  useEffect(() => {
    if (pacient.user && pacient.user.pacient_id) {
      fetchRecords(pacient.user.pacient_id)
      .then(data => { 
        setRecs(data.rows.filter((r) => { return r.prescription !== null })); 
        console.log(data); 
        setLoading1(false);
      })
    } else if (doct.doc) {
      fetchRecords(pac_param)
        .then(data => {
          setRecs(data.rows.filter((r) => { return r.prescription !== null }));
          console.log(data);
          setLoading1(false);
        })
    }
    fetchCabinet().then(data => { setCabs(data.rows); setLoading2(false) })
    fetchDoctor().then(data => { setDocs(data.rows); setLoading3(false) })
    fetchSpeciality().then(data => { setSpecs(data); setLoading4(false) })
    fetchTimetable().then(data => { setTims(data.rows); setLoading5(false) })
  }, [])
  return (
    <Container
      className="mt-4 mb-2"
      style={{ height: window.innerHeight * 1.25 }}
    >
      <div>
        <Table responsive="md">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Время</th>
              <th>Кабинет</th>
              <th>Врач</th>
              <th>Пациент</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tims && specs && docs && cabs && recs && recs.map(r =>
              <tr key={r.record_id}>
                <td>
                  {(new Date(r.start)).toDateString()}
                </td>
                <td>
                  {(new Date(r.start)).toTimeString()}
                </td>
                <td>
                  {tims.find((t) => { return t.timetable_id === r.timetableTimetableId }).cabinetCabinetId}
                </td>
                <td>
                  {
                    docs.find((doc) => {
                      return doc.doctor_id === tims.find((tim) => {
                        return tim.timetable_id === r.timetableTimetableId
                      }).doctorDoctorId
                    }).first_name} {
                    docs.find((doc) => {
                      return doc.doctor_id === tims.find((tim) => {
                        return tim.timetable_id === r.timetableTimetableId
                      }).doctorDoctorId
                    }).last_name}
                </td>
                <td>
                  {r.pacient.first_name} {r.pacient.last_name}
                </td>
               <td><Button onClick={
                  () => {
                    setTopre(r)
                    setModalShow(true);
                  }
                }>
                  Заключение
                </Button>
                </td>
              </tr>
            )}
          </tbody>
          <Prescription
            topre={topre}
            show={modalShow}
            onHide={() => { setModalShow(false); }}
          />
        </Table>

      </div>
    </Container>
  );
}

export default Perscriptions;
