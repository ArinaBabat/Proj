import React, {useState, useEffect,useContext} from 'react';
import {Button, Container} from "react-bootstrap";
import ModalSpeciality from "../components/modals/ModalSpeciality";
import ModalDoctor from "../components/modals/ModalDoctor";
import ModalCabinet from "../components/modals/ModalCabinet";
import ModalTimetable from "../components/modals/ModalTimetable";
import {fetchTimetable, fetchCabinet, fetchSpeciality, fetchDoctor} from "../http/timAPI";
import {Context} from "../index";

const HeadPhysician = () => {
  const [SpecialityVisible, setSpecialityVisible] = useState(false)
  const [DoctorVisible, setDoctorVisible] = useState(false)
  const [CabinetVisible, setCabinetVisible] = useState(false)
  const [TimetableVisible, setTimetableVisible] = useState(false)
  const {timet} = useContext(Context)
  useEffect(() => {
        fetchTimetable().then(data => timet.setTimetable(data))
        fetchCabinet().then(data => timet.setCabinet(data))
        fetchDoctor().then(data => timet.setDoctor(data))
        fetchSpeciality().then(data => timet.setSpec(data))
    }, [])
    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-info"}
                className="mt-4 p-2"
                onClick={() => setSpecialityVisible(true)}
            >
                Специальности
            </Button>
            <Button
                variant={"outline-info"}
                className="mt-4 p-2"
                onClick={() => setCabinetVisible(true)}
            >
                Кабинеты
            </Button>
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
            <ModalSpeciality show={SpecialityVisible} onHide={() => setSpecialityVisible(false)}/>
            <ModalDoctor show={DoctorVisible} onHide={() => setDoctorVisible(false)}/>
            <ModalCabinet show={CabinetVisible} onHide={() => setCabinetVisible(false)}/>
            <ModalTimetable show={TimetableVisible} onHide={() => setTimetableVisible(false)}/>
        </Container>
    );
};
export default HeadPhysician;
