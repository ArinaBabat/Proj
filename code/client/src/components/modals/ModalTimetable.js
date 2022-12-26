import React, {useContext, useState,useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
//import {createType} from "../../http/deviceAPI";

const CreateTim = ({show, onHide}) => {


    return (
        <Modal
           show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton onClick={onHide}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить расписание
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                  //      value={value}
                  //      onChange={e => setValue(e.target.value)}
                        placeholder={""}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>

                <Button variant="outline-success" >Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateTim;
