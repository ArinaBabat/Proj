import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {Context} from "../../index";



const CreateType = ({show, onHide}) => {        //где-то здесь
  const {doctor} = useContext(Context)
  const {timet} = useContext(Context)
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Начните вводить..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );
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
                        placeholder={"Введите имя"}
                    />
                    <Form.Control
                    className="mt-4 p-2"
                        placeholder={"Введите фамилию"}
                    />
                    <Form.Control
                    className="mt-4 p-2"
                        placeholder={"Введите пароль"}
                    />
                    <Form.Select className="mt-2 mb-2">
                      <option>Выбpaть роль</option>
                      <option value="1">Доктор</option>
                      <option value="2">Главный врач</option>
                    </Form.Select>
                    <Form.Select className="mt-2 mb-2">
                      <option>Выбpaть специальность</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer>

                <Button variant="outline-success" >Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;
