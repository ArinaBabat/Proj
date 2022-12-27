import React, {useState,useContext,useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import {Context} from "../../index";

const ModalCabinet = ({show, onHide}) => {
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
                      Добавить/удалить кабинет
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                  Выбрать кабинет
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>
                  {timet.cab.map( cab =>
                    <Dropdown.Item key={cab.cabinet_id}> {cab.number} </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown
              className="mt-2 mb-2">
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                  Выбрать специальность
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>
                  {timet.spec.map( spec =>
                    <Dropdown.Item key={timet.spec.specialitySpecialityId}> {spec.name} </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
                  <Form>
                      <Form.Control
                      className="mt-2 mb-2"
                        //  value={value}
                        //  onChange={e => setValue(e.target.value)}
                          placeholder={"Введите номер кабинета"}
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

export default ModalCabinet;
