import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
//import {createType} from "../../http/deviceAPI";

const CreateType = ({show, onHide}) => {
  //  const [value, setValue] = useState('')
//
//  const addType = () => {
//        createType({name: value}).then(data => {
//            setValue('')
//            onHide()
//        })
//    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton onClick={onHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить/удалить специальность
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                      //  value={value}
                      //  onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название специальности"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Удалить</Button>
                <Button variant="outline-success" >Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;
