import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function NewPer(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          диагноз
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          заключение
        </p>
      </Modal.Body>
    </Modal>
  );
}
export default NewPer;
