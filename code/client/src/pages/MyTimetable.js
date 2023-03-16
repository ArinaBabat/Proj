import React from 'react';
import Table from 'react-bootstrap/Table';

const MyTimetable = () => {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>День недели</th>
          <th>Начало приёма</th>
          <th>Конец приёма</th>
          <th>Кабинет</th>
          <th>Количество записей</th>
        </tr>
      </thead>
      <tbody>
        <tr >
          <td>Понедельник</td>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>Вторник</td>
          <td>1</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>Среда</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td>Четверг</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td>Пятница</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td>Суббота</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td>Воскресенье</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>@twitter</td>
        </tr>

      </tbody>
    </Table>
  );
};
export default MyTimetable;
