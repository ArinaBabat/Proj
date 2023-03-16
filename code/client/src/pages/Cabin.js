import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Cabin = () => {
  return (
    <>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="name@mail" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Адрес</Form.Label>
        <Form.Control as="textarea" rows={2} />
      </Form.Group>
      <Form.Select aria-label="Default select example">
        <option>Выбор лечащего врача</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>


    <Button className="mt-4 p-2" variant="outline-primary">Сохранить</Button>
    </Form>
    </>
  );
};
export default Cabin;
