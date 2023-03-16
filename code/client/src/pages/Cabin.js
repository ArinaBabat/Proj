import { $authHost, $host } from "../http/index";
import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { fetchDoctor } from '../http/timAPI';
import { Context } from "../index";

const Cabin = () => {
  const { timet } = useContext(Context)
  const { pacient } = useContext(Context);
  const [doc, setDoc] = useState(pacient.user.doctorDoctorId);
  const [mail, setMail] = useState(pacient.user.mail);
  const [address, setAddress] = useState(pacient.user.address);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchDoctor().then(data => { timet.setDoc(data); console.log(data); setLoading(false) })
  }, [])

  const handleMail = async () => {
    if (mail === '') {
      alert('Необходимо заполнить поле');
      return
    }
    try {
      let data = await $authHost.post('api/pacient/set/mail', { mail })
      let u = pacient.user;
      u.mail = mail;
      pacient.setUser(u);
    } catch (e) {
      alert(e.response.data.message);
      return
    }
  }

  const handleAddress = async () => {
    if (address === '') {
      alert('Необходимо заполнить поле');
      return
    }
    try {
      console.log(address);
      let data = await $authHost.post('api/pacient/set/address', { address })
      let u = pacient.user;
      u.address = address;
      pacient.setUser(u);
    } catch (e) {
      alert(e.response.data.message);
      return
    }
  }

  const handleDoc = async () => {
    if (doc === '') {
      alert('Необходимо заполнить поле');
      return
    }
    try {
      let data = await $authHost.post('api/pacient/set/doctor', { doctor_id: doc })
      let u = pacient.user;
      u.doctorDoctorId = doc;
      pacient.setUser(u);
    } catch (e) {
      alert(e.response.data.message);
      return
    }
  }

  return (
    <>
    <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
        <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="name@mail" onChange={(e) => setMail(e.target.value)}
            value={mail} />
      </Form.Group>

    <Button className="mt-4 p-2" variant="outline-primary" onClick={handleMail}>Сохранить</Button>

    </Form>


      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Адрес</Form.Label>
          <Form.Control as="textarea" rows={2} onChange={(e) => setAddress(e.target.value)}
            value={address} />
        </Form.Group>

        <Button className="mt-4 p-2" variant="outline-primary" onClick={handleAddress}>Сохранить</Button>

      </Form>


      <Form>
        <Form.Select
          className="mt-4 p-2"
          aria-label="Default select example"
          value={doc}
          onChange={e => {
            setDoc(e.target.value);
          }}>
          <option value=''>Выбор лечащего врача</option>
          {timet && timet.doc && timet.doc.rows && timet.doc.rows.map(doc =>
            <option
              onClick={() => timet.setDoc(doc)}
              key={doc.doctor_id}
              value={doc.doctor_id}
            >
              {doc.first_name} {doc.last_name}
            </option>
          )}
        </Form.Select>

        <Button className="mt-4 p-2" variant="outline-primary" onClick={handleDoc}>Сохранить</Button>

      </Form>
    </>
  );
};
export default Cabin;
