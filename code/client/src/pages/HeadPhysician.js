import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import ModalSpeciality from "../components/modals/ModalSpeciality";
import ModalDoctor from "../components/modals/ModalDoctor";
import ModalCabinet from "../components/modals/ModalCabinet";
import ModalTimetabie from "../components/modals/ModalTimetabie";
const HeadPhysician = () => {
    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-info"}
                className="mt-4 p-2"
            >
                Специальности
            </Button>
            <Button
                variant={"outline-info"}
                className="mt-4 p-2"
            >
                Кабинеты
            </Button>
            <Button
                variant={"outline-info"}
                className="mt-4 p-2"
            >
                Врачи
            </Button>
            <Button
                variant={"outline-info"}
                className="mt-4 p-2"
            >
                Расписание
            </Button>
            <ModalSpeciality/>
            <ModalDoctor/>
            <ModalCabinet/>
            <ModalTimetabie/>
        </Container>
    );
};
export default HeadPhysician;
