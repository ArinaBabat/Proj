import {
  MY_RECORDS_ROUTE, 
  HEAD_PHYSICIAN_ROUTE,
  PACIENT_ROUTE, 
  DOCTOR_LOGIN_ROUTE, 
  LOGIN_ROUTE, 
  PACIENT_LOGIN_ROUTE, 
  PACIENT_REGISTRATION_ROUTE,
  DOCTOR_TIMETABLE_ROUTE, 
  NEW_RECORD_ROUTE, 
  DOCTOR_PACIENTS_ROUTE, 
  PRESCRIPTIONS_ROUTE, 
  PACIENT_RECORDS_ROUTE, 
  TIMETABLE_ROUTE
} from "./utils/consts";
import Auth from "./pages/Auth";
import Timetable from "./pages/Timetable";
import HeadPhysician from "./pages/HeadPhysician";
import Pacients from "./pages/Pacients";
import MyTimetable from "./pages/MyTimetable";
import Records from "./pages/Records";
import NewRecord from "./pages/NewRecord";
import Prescriptions from "./pages/Prescriptions";
import Log from "./pages/auth-redirect";
import Cabin from "./pages/Cabin";
import MyRecords from "./pages/MyRecords";
export const authRoutes = [
  {
    path: HEAD_PHYSICIAN_ROUTE,
    Component: HeadPhysician
  },
  {
    path: DOCTOR_PACIENTS_ROUTE,
    Component: Pacients
  },
  {
    path: DOCTOR_TIMETABLE_ROUTE,
    Component: MyTimetable
  },
  {
    path: PACIENT_RECORDS_ROUTE,
    Component: Records
  },
  {
    path: NEW_RECORD_ROUTE,
    Component: NewRecord
  },
  {
    path: PRESCRIPTIONS_ROUTE,
    Component: Prescriptions
  },
  {
    path: PRESCRIPTIONS_ROUTE + '/:pacient_id' ,
    Component: Prescriptions
  },
  {
    path: PACIENT_ROUTE,
    Component: Cabin
  },
  {
    path: MY_RECORDS_ROUTE+'/:timetable_id',
    Component: MyRecords
  },
]
export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Log
  },
  {
    path: TIMETABLE_ROUTE,
    Component: Timetable
  },
  {
    path: PACIENT_LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: PACIENT_REGISTRATION_ROUTE,
    Component: Auth
  },
  {
    path: DOCTOR_LOGIN_ROUTE,
    Component: Auth
  },
]
