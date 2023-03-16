import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



const NewRecord = () => {
  return (
    <>
    <Form className="mt-10 p-2">
    <Form.Select className="mt-4 p-2" aria-label="Default select example">
      <option>Выбор специальности</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
    <Form.Select className="mt-4 p-2" aria-label="Default select example">
      <option>Выбор специалиста</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
    <Form.Select className="mt-4 p-2" aria-label="Default select example">
      <option>Выбор дня</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
    <Form.Select className="mt-4 p-2" aria-label="Default select example">
      <option>Выбор времени</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
    <Button className="mt-4 p-2" variant="outline-primary">Записаться</Button>
    </Form>
    </>
  );
};
export default NewRecord;
