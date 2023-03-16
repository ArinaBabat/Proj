import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
      <Button variant="danger" onClick={props.onHide}>
          Отменить запись
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const Records = () => {
  const [modalShow, setModalShow] = React.useState(false);
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
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td><Button variant="outline-danger" onClick={() => setModalShow(true)}>
        Отменить
      </Button>

      <DeleteRecord
        show={modalShow}
        onHide={() => setModalShow(false)}
      /></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@mdo</td>
            <td><Button variant="outline-danger" onClick={() => setModalShow(true)}>
        Отменить
      </Button>

      <DeleteRecord
        show={modalShow}
        onHide={() => setModalShow(false)}
      /></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Larry the Bird</td>
            <td>@twitter</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td><Button variant="outline-danger" onClick={() => setModalShow(true)}>
        Отменить
      </Button>

      <DeleteRecord
        show={modalShow}
        onHide={() => setModalShow(false)}
      /></td>
          </tr>
        </tbody>
      </Table>
    );
  }

export default Records;
