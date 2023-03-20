import { $authHost, $host } from "../http/index";
import React, {useContext, useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom'
import {PRESCRIPTIONS_ROUTE} from "../utils/consts";
import {fetchTimetable, fetchCabinet, fetchSpeciality, fetchDoctor} from "../http/timAPI";
import {Context} from "../index";
import { Container } from "react-bootstrap";

const Pacients = () => {
  const {doct} = useContext(Context);
  const [pacients, setPacients] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const a = async () => {
      const { data } = await $authHost.get('api/doctor/pacients', doct.doc.id);
      setPacients(data);
      console.log(data)
    }
    a();
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
              <th>Имя</th>
              <th>Фамилия</th>
              <th>mail</th>
              <th>Адрес</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pacients && pacients.rows && pacients.rows.map(data =>
              <tr
                key={data.pacient_id}
              >
                <td>{data.first_name}</td>
                <td>{data.last_name}</td>
                <td>{data.mail}</td>
                <td>{data.address}</td>
                <td><Button variant="outline-primary"
                  onClick={() => navigate(PRESCRIPTIONS_ROUTE + `/${data.pacient_id}`)}>
                  Просмотр заключений
                </Button>
                </td>
              </tr>
            )}
          </tbody>
        </Table>

    </div>
    </Container>
  );
};
export default Pacients;
