import { $authHost, $host } from "../../http/index";
import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {Context} from "../../index";

const CreateType = ({show, onHide}) => {

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
  const [first_name, setfn] = useState('');
  const [last_name, setln] = useState('');
  const [password, setp] = useState('');
  const [role, setr] = useState("DOCTOR");
  const [speciality, sets] = useState("1");

  const handleSubmit = async () => {
    if (first_name === '' || last_name === '' || password === '') {
      alert('Необходимо заполнить все поля');
      return
    }
    try {
      let data = await $authHost.post('api/doctor/create', { first_name, last_name, password, role, specialitySpecialityId: speciality })
      window.location.replace("http://localhost:3000/headphysician");
    } catch (e) {
      alert(e.response.data.message);
    }
    
    
  }
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
                    value={first_name}
                        placeholder={"Введите имя"}
                    onChange={e => {
                      setfn(e.target.value);
                    }}
                    />
                    <Form.Control
                    className="mt-4 p-2"
                      value={last_name}
                        placeholder={"Введите фамилию"}
                    onChange={e => {
                      setln(e.target.value);
                    }}
                    />
                    <Form.Control
                    className="mt-4 p-2"
                      value={password}
                        placeholder={"Введите пароль"}
                    onChange={e => {
                      setp(e.target.value);
                    }}
                    />
                    <Form.Select className="mt-2 mb-2" value={role} onChange={e => {
                      setr(e.target.value);
                    }}>

                      <option value="DOCTOR">Доктор</option>
                      <option value="HEAD_PHYSICIAN">Главный врач</option>
                    </Form.Select>
                    <Form.Select className="mt-2 mb-2" value={speciality} onChange={e => {
                      sets(e.target.value);
                    }}>

                      <option value="1">Невролог</option>
                      <option value="2">Терапевт</option>
                      <option value="3">Офтальмолог</option>
                      <option value="4">Хирург</option>
                      <option value="5">Отоларинголог</option>
                      <option value="6">Кардиолог</option>
                    </Form.Select>

                </Form>
            </Modal.Body>
            <Modal.Footer>
          <Button variant="outline-success" onClick={handleSubmit}>Добавить</Button>

            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;
