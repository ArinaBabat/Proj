import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {Context} from "../../index";
//import {createType} from "../../http/deviceAPI";

const CreateType = ({show, onHide}) => {
  const {doctor} = useContext(Context)
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
                    Добавить врача
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                    className="mt-4 p-2"
                      //  value={value}
                      //  onChange={e => setValue(e.target.value)}
                        placeholder={"Введите имя"}
                    />
                    <Form.Control
                    className="mt-4 p-2"
                      //  value={value}
                      //  onChange={e => setValue(e.target.value)}
                        placeholder={"Введите фамилию"}
                    />
                    <Form.Control
                    className="mt-4 p-2"
                      //  value={value}
                      //  onChange={e => setValue(e.target.value)}
                        placeholder={"Введите пароль"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>

                <Button variant="outline-success" >Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;
