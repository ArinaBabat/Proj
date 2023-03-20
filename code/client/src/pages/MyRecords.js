import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../index";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchTimetable, fetchCabinet, fetchSpeciality, fetchDoctor } from "../http/timAPI";
import { $authHost, $host } from "../http/index";
import { Container, Form } from "react-bootstrap";
import { useParams, useSearchParams } from 'react-router-dom';

function NewPrescription(props) {
  const [dia, setDia] = useState('');
  const [pre, setPre] = useState('');
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Создайте заключение
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Диагноз</Form.Label>
            <Form.Control value={dia} onChange={(e)=>{setDia(e.target.value)}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Заключение</Form.Label>
            <Form.Control value={pre} as="textarea" rows={3} onChange={(e) => { setPre(e.target.value) }} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={
          async () => {
            try {
              if (dia === '' || pre === '' || !props.topre) {
                return alert('Заполните все поля');
              }
              const { data } = await $authHost.post('api/prescription/create', { diagnostic: dia, therapy: pre, record_id: props.topre });
              window.location.replace(window.location);
              setDia('');
              setPre('');
              props.onHide()
            } catch (e) {
              alert(e.response.data.message);
              return
            }
          }
        }>
          Подтвердить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

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

const MyRecords = (props) => {
  let { timetable_id : tim_param } = useParams();
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const { timet } = useContext(Context)
  const { pacient } = useContext(Context)
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [loading3, setLoading3] = useState(true)
  const [loading4, setLoading4] = useState(true)
  const [loading5, setLoading5] = useState(true)
  const [tims, setTims] = useState(null);
  const [specs, setSpecs] = useState(null);
  const [docs, setDocs] = useState(null);
  const [cabs, setCabs] = useState(null);
  const [topre1, setTopre1] = useState(null)
  const [topre2, setTopre2] = useState(null)
  const [recs, setRecs] = useState(null)
  const fetchRecords = async (timetable_id) => {
    const { data } = await $authHost.get(`api/record/?timetableTimetableId=${timetable_id}`,)
    return data;
  }
  useEffect(() => {
    fetchRecords(tim_param).then(data => { setRecs(data.rows); console.log(data); setLoading1(false) })
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
                  {r.pacient.first_name} {r.pacient.last_name}
                </td>
                {!r.prescription && <td><Button onClick={
                  () => {
                    setTopre1(r.record_id)
                    setModalShow1(true);
                  }
                }>
                  Написать заключение
                </Button>
                </td>}
                {r.prescription && <td><Button onClick={
                  () => {
                    setTopre2(r)
                    setModalShow2(true);
                  }
                }>
                  Заключение
                </Button>
                </td>}
              </tr>
            )}
          </tbody>
          <NewPrescription
            topre={topre1}
            show={modalShow1}
            onHide={() => { setModalShow1(false); }}
          />
          <Prescription
            topre={topre2}
            show={modalShow2}
            onHide={() => { setModalShow2(false); }}
          />
        </Table>

      </div>
    </Container>
  );
  }

export default MyRecords;
