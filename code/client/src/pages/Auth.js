import React, {useContext, useState} from 'react';
import {Container, Form, Card} from 'react-bootstrap'
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

const Auth = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight}}
    >
    <Card style={{width: 600}} className="p-5">
      <h2 className="m-auto">Авторизация</h2>
    <Form className="d-flex flex-column">
    <Form.Control
      className="mt-3"
      placeholder="Введите ваш логин..."
    />
    <Form.Control
      className="mt-3"
      placeholder="Введите ваш пароль..."
    />
    <Button
      className="mt-3"
      variant={"outline-success"}
    >
      Войти
    </Button>
    </Form>
    </Card>
    </Container>
  );
};
export default Auth;
