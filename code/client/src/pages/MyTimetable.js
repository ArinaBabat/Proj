import React from 'react';
import Table from 'react-bootstrap/Table';

const MyTimetable = () => {
  return (
    <Table striped="columns">
      <thead>
        <tr>
          <th>День недели</th>
          <th>Время</th>
          <th>Кабинет</th>
          <th>Количество записей</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Понедельник</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>Вторник</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>Среда</td>
          <td >Larry the Bird</td>
          <td >Larry the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td>Четверг</td>
          <td >Larry the Bird</td>
          <td >Larry the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td>Пятница</td>
          <td >Larry the Bird</td>
          <td >Larry the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td>Суббота</td>
          <td >Larry the Bird</td>
          <td >Larry the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td>Воскресенье</td>
          <td >Larry the Bird</td>
          <td >Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
}
export default MyTimetable;
