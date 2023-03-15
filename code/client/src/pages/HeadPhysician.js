import React, {useState, useEffect,useContext} from 'react';
import {Button, Container} from "react-bootstrap";
import ModalDoctor from "../components/modals/ModalDoctor";
import ModalTimetable from "../components/modals/ModalTimetable";
import {fetchTimetable, fetchDoctor} from "../http/timAPI";
import {Context} from "../index";

const HeadPhysician = () => {
  const [DoctorVisible, setDoctorVisible] = useState(false)
  const [TimetableVisible, setTimetableVisible] = useState(false)
  const {timet} = useContext(Context)
  useEffect(() => {
        fetchTimetable().then(data => timet.setTim(data))
        fetchDoctor().then(data => timet.setDoc(data))
    }, [])

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-info"}
                className="mt-4 p-2"
                onClick={() => setDoctorVisible(true)}
            >
                Врачи
            </Button>
            <Button
                variant={"outline-info"}
                className="mt-4 p-2"
                onClick={() => setTimetableVisible(true)}
            >
                Расписание
            </Button>
            <ModalDoctor show={DoctorVisible} onHide={() => setDoctorVisible(false)}/>
            <ModalTimetable show={TimetableVisible} onHide={() => setTimetableVisible(false)}/>
        </Container>
    );
};
export default HeadPhysician;
