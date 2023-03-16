--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.4

-- Started on 2023-03-15 16:11:00

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 25935)
-- Name: cabinets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cabinets (
    cabinet_id integer NOT NULL,
    number integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "specialitySpecialityId" integer
);


ALTER TABLE public.cabinets OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 25934)
-- Name: cabinets_cabinet_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cabinets_cabinet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cabinets_cabinet_id_seq OWNER TO postgres;

--
-- TOC entry 3384 (class 0 OID 0)
-- Dependencies: 214
-- Name: cabinets_cabinet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cabinets_cabinet_id_seq OWNED BY public.cabinets.cabinet_id;


--
-- TOC entry 212 (class 1259 OID 25906)
-- Name: doctors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctors (
    doctor_id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'DOCTOR'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "specialitySpecialityId" integer
);


ALTER TABLE public.doctors OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 25905)
-- Name: doctors_doctor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.doctors_doctor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.doctors_doctor_id_seq OWNER TO postgres;

--
-- TOC entry 3385 (class 0 OID 0)
-- Dependencies: 211
-- Name: doctors_doctor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.doctors_doctor_id_seq OWNED BY public.doctors.doctor_id;


--
-- TOC entry 213 (class 1259 OID 25920)
-- Name: pacients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pacients (
    pacient_id integer NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    address character varying(255),
    mail character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "doctorDoctorId" integer
);


ALTER TABLE public.pacients OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 25986)
-- Name: prescriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prescriptions (
    id integer NOT NULL,
    diagnostic character varying(255),
    therapy character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "recordRecordId" integer
);


ALTER TABLE public.prescriptions OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 25985)
-- Name: prescriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.prescriptions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.prescriptions_id_seq OWNER TO postgres;

--
-- TOC entry 3386 (class 0 OID 0)
-- Dependencies: 220
-- Name: prescriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.prescriptions_id_seq OWNED BY public.prescriptions.id;


--
-- TOC entry 219 (class 1259 OID 25964)
-- Name: records; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.records (
    record_id integer NOT NULL,
    "time" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "pacientPacientId" integer,
    "doctorDoctorId" integer,
    "timetableTimetableId" integer
);


ALTER TABLE public.records OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 25963)
-- Name: records_record_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.records_record_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.records_record_id_seq OWNER TO postgres;

--
-- TOC entry 3387 (class 0 OID 0)
-- Dependencies: 218
-- Name: records_record_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.records_record_id_seq OWNED BY public.records.record_id;


--
-- TOC entry 210 (class 1259 OID 25897)
-- Name: specialities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.specialities (
    speciality_id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.specialities OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 25896)
-- Name: specialities_speciality_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.specialities_speciality_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.specialities_speciality_id_seq OWNER TO postgres;

--
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 209
-- Name: specialities_speciality_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.specialities_speciality_id_seq OWNED BY public.specialities.speciality_id;


--
-- TOC entry 217 (class 1259 OID 25947)
-- Name: timetables; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.timetables (
    timetable_id integer NOT NULL,
    day character varying(255) NOT NULL,
    start_of_admission integer NOT NULL,
    end_of_reception integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "cabinetCabinetId" integer,
    "doctorDoctorId" integer
);


ALTER TABLE public.timetables OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 25946)
-- Name: timetables_timetable_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.timetables_timetable_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.timetables_timetable_id_seq OWNER TO postgres;

--
-- TOC entry 3389 (class 0 OID 0)
-- Dependencies: 216
-- Name: timetables_timetable_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.timetables_timetable_id_seq OWNED BY public.timetables.timetable_id;


--
-- TOC entry 3196 (class 2604 OID 25938)
-- Name: cabinets cabinet_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cabinets ALTER COLUMN cabinet_id SET DEFAULT nextval('public.cabinets_cabinet_id_seq'::regclass);


--
-- TOC entry 3194 (class 2604 OID 25909)
-- Name: doctors doctor_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors ALTER COLUMN doctor_id SET DEFAULT nextval('public.doctors_doctor_id_seq'::regclass);


--
-- TOC entry 3199 (class 2604 OID 25989)
-- Name: prescriptions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescriptions ALTER COLUMN id SET DEFAULT nextval('public.prescriptions_id_seq'::regclass);


--
-- TOC entry 3198 (class 2604 OID 25967)
-- Name: records record_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.records ALTER COLUMN record_id SET DEFAULT nextval('public.records_record_id_seq'::regclass);


--
-- TOC entry 3193 (class 2604 OID 25900)
-- Name: specialities speciality_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specialities ALTER COLUMN speciality_id SET DEFAULT nextval('public.specialities_speciality_id_seq'::regclass);


--
-- TOC entry 3197 (class 2604 OID 25950)
-- Name: timetables timetable_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetables ALTER COLUMN timetable_id SET DEFAULT nextval('public.timetables_timetable_id_seq'::regclass);


--
-- TOC entry 3372 (class 0 OID 25935)
-- Dependencies: 215
-- Data for Name: cabinets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cabinets (cabinet_id, number, "createdAt", "updatedAt", "specialitySpecialityId") FROM stdin;
1	1	2023-03-15 15:59:32.082881+03	2023-03-15 15:59:32.082881+03	1
2	2	2023-03-15 15:59:36.738567+03	2023-03-15 15:59:36.738567+03	2
3	3	2023-03-15 15:59:41.097159+03	2023-03-15 15:59:41.097159+03	3
4	4	2023-03-15 15:59:45.725602+03	2023-03-15 15:59:45.725602+03	4
5	5	2023-03-15 15:59:50.430813+03	2023-03-15 15:59:50.430813+03	5
6	6	2023-03-15 15:59:54.958653+03	2023-03-15 15:59:54.958653+03	6
\.


--
-- TOC entry 3369 (class 0 OID 25906)
-- Dependencies: 212
-- Data for Name: doctors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctors (doctor_id, first_name, last_name, password, role, "createdAt", "updatedAt", "specialitySpecialityId") FROM stdin;
1	Наталья	Сироткина	$2b$05$/fNTwrsVT3O/YzAd.A11gO0gbtmZTogesMT/cnPfaFfixuxQkLXHe	HEAD_PHYSICIAN	2023-03-15 16:09:34.622966+03	2023-03-15 16:09:34.622966+03	2
\.


--
-- TOC entry 3370 (class 0 OID 25920)
-- Dependencies: 213
-- Data for Name: pacients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pacients (pacient_id, first_name, last_name, address, mail, "createdAt", "updatedAt", "doctorDoctorId") FROM stdin;
\.


--
-- TOC entry 3378 (class 0 OID 25986)
-- Dependencies: 221
-- Data for Name: prescriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.prescriptions (id, diagnostic, therapy, "createdAt", "updatedAt", "recordRecordId") FROM stdin;
\.


--
-- TOC entry 3376 (class 0 OID 25964)
-- Dependencies: 219
-- Data for Name: records; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.records (record_id, "time", "createdAt", "updatedAt", "pacientPacientId", "doctorDoctorId", "timetableTimetableId") FROM stdin;
\.


--
-- TOC entry 3367 (class 0 OID 25897)
-- Dependencies: 210
-- Data for Name: specialities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.specialities (speciality_id, name, "createdAt", "updatedAt") FROM stdin;
2	Терапевт	2023-03-15 15:56:33.068428+03	2023-03-15 15:56:33.068428+03
3	Офтальмолог	2023-03-15 15:56:45.339796+03	2023-03-15 15:56:45.339796+03
4	Хирург	2023-03-15 15:56:54.597734+03	2023-03-15 15:56:54.597734+03
5	Отоларинголог	2023-03-15 15:57:01.19521+03	2023-03-15 15:57:01.19521+03
6	Кардиолог	2023-03-15 15:57:08.630453+03	2023-03-15 15:57:08.630453+03
1	Невролог	2023-03-15 15:57:14.965354+03	2023-03-15 15:57:14.965354+03
\.


--
-- TOC entry 3374 (class 0 OID 25947)
-- Dependencies: 217
-- Data for Name: timetables; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.timetables (timetable_id, day, start_of_admission, end_of_reception, "createdAt", "updatedAt", "cabinetCabinetId", "doctorDoctorId") FROM stdin;
\.


--
-- TOC entry 3390 (class 0 OID 0)
-- Dependencies: 214
-- Name: cabinets_cabinet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cabinets_cabinet_id_seq', 1, false);


--
-- TOC entry 3391 (class 0 OID 0)
-- Dependencies: 211
-- Name: doctors_doctor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.doctors_doctor_id_seq', 1, false);


--
-- TOC entry 3392 (class 0 OID 0)
-- Dependencies: 220
-- Name: prescriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.prescriptions_id_seq', 1, false);


--
-- TOC entry 3393 (class 0 OID 0)
-- Dependencies: 218
-- Name: records_record_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.records_record_id_seq', 1, false);


--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 209
-- Name: specialities_speciality_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.specialities_speciality_id_seq', 7, true);


--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 216
-- Name: timetables_timetable_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.timetables_timetable_id_seq', 1, false);


--
-- TOC entry 3211 (class 2606 OID 25940)
-- Name: cabinets cabinets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cabinets
    ADD CONSTRAINT cabinets_pkey PRIMARY KEY (cabinet_id);


--
-- TOC entry 3205 (class 2606 OID 25914)
-- Name: doctors doctors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (doctor_id);


--
-- TOC entry 3207 (class 2606 OID 25928)
-- Name: pacients pacients_mail_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pacients
    ADD CONSTRAINT pacients_mail_key UNIQUE (mail);


--
-- TOC entry 3209 (class 2606 OID 25926)
-- Name: pacients pacients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pacients
    ADD CONSTRAINT pacients_pkey PRIMARY KEY (pacient_id);


--
-- TOC entry 3217 (class 2606 OID 25993)
-- Name: prescriptions prescriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescriptions
    ADD CONSTRAINT prescriptions_pkey PRIMARY KEY (id);


--
-- TOC entry 3215 (class 2606 OID 25969)
-- Name: records records_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.records
    ADD CONSTRAINT records_pkey PRIMARY KEY (record_id);


--
-- TOC entry 3201 (class 2606 OID 25904)
-- Name: specialities specialities_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specialities
    ADD CONSTRAINT specialities_name_key UNIQUE (name);


--
-- TOC entry 3203 (class 2606 OID 25902)
-- Name: specialities specialities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specialities
    ADD CONSTRAINT specialities_pkey PRIMARY KEY (speciality_id);


--
-- TOC entry 3213 (class 2606 OID 25952)
-- Name: timetables timetables_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetables
    ADD CONSTRAINT timetables_pkey PRIMARY KEY (timetable_id);


--
-- TOC entry 3220 (class 2606 OID 25941)
-- Name: cabinets cabinets_specialitySpecialityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cabinets
    ADD CONSTRAINT "cabinets_specialitySpecialityId_fkey" FOREIGN KEY ("specialitySpecialityId") REFERENCES public.specialities(speciality_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3218 (class 2606 OID 25915)
-- Name: doctors doctors_specialitySpecialityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT "doctors_specialitySpecialityId_fkey" FOREIGN KEY ("specialitySpecialityId") REFERENCES public.specialities(speciality_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3219 (class 2606 OID 25929)
-- Name: pacients pacients_doctorDoctorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pacients
    ADD CONSTRAINT "pacients_doctorDoctorId_fkey" FOREIGN KEY ("doctorDoctorId") REFERENCES public.doctors(doctor_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3226 (class 2606 OID 25994)
-- Name: prescriptions prescriptions_recordRecordId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescriptions
    ADD CONSTRAINT "prescriptions_recordRecordId_fkey" FOREIGN KEY ("recordRecordId") REFERENCES public.records(record_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3224 (class 2606 OID 25975)
-- Name: records records_doctorDoctorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.records
    ADD CONSTRAINT "records_doctorDoctorId_fkey" FOREIGN KEY ("doctorDoctorId") REFERENCES public.doctors(doctor_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3223 (class 2606 OID 25970)
-- Name: records records_pacientPacientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.records
    ADD CONSTRAINT "records_pacientPacientId_fkey" FOREIGN KEY ("pacientPacientId") REFERENCES public.pacients(pacient_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3225 (class 2606 OID 25980)
-- Name: records records_timetableTimetableId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.records
    ADD CONSTRAINT "records_timetableTimetableId_fkey" FOREIGN KEY ("timetableTimetableId") REFERENCES public.timetables(timetable_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3221 (class 2606 OID 25953)
-- Name: timetables timetables_cabinetCabinetId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetables
    ADD CONSTRAINT "timetables_cabinetCabinetId_fkey" FOREIGN KEY ("cabinetCabinetId") REFERENCES public.cabinets(cabinet_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3222 (class 2606 OID 25958)
-- Name: timetables timetables_doctorDoctorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timetables
    ADD CONSTRAINT "timetables_doctorDoctorId_fkey" FOREIGN KEY ("doctorDoctorId") REFERENCES public.doctors(doctor_id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2023-03-15 16:11:00

--
-- PostgreSQL database dump complete
--

