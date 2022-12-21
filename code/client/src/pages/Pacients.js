import React from 'react';
import Table from 'react-bootstrap/Table';
import {useNavigate} from 'react-router-dom'
import {PRESCRIPTIONS_ROUTE} from "../utils/consts";

const Pacients = () => {
  const navigate = useNavigate()
  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr onClick={() => navigate(PRESCRIPTIONS_ROUTE + '/1')}>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr onClick={() => navigate(PRESCRIPTIONS_ROUTE + '/2')}>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr onClick={() => navigate(PRESCRIPTIONS_ROUTE + '/3')}>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
};
export default Pacients;
