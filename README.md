# Описание
Сайт поликлиники с возможностью электронной записи.
Возможен вход в качестве врача и пациета.
# Данные
![ER-diagram](https://user-images.githubusercontent.com/106030709/226183115-a811e3f7-2bd5-4c43-94f4-0bc082f6e262.png)
- Patients - таблица с данными пациентов и id лечащего врача.
- Doctors - доктора и их специальности. Сюда же входит главврач.
- Timetable - расписание.
- Records - записи.
- Prescriptions - заключения после приёма: диагноз, назначения.
- Cabinets - таблица данных о том, для какой специальности врача оборудованы кабинеты.
- Specialties - список имеющихся специальностей.
## Общие ограничения целостности
- Назначения пациента доступны только ему и его лечащему врачу.
- Вносить изменения в расписание может только главврач.
# Пользовательские роли
### patient
Возможности:
- запись к врачу
- отмена предстоящей записи
- просмотр своих назначений и диагнозов
- редактирование своих данных
- выбор лечащего врача
### doctor
Возможности:
- просмотр своих предстоящих записей
- просмотр назначений и прочих данных своих пациентов
- просмотр своего расписания
- написание заключений
### head_physician
Возможности:
- просмотр своих предстоящих записей
- просмотр назначений и прочих данных своих пациентов
- просмотр своего расписания
- написание заключений
- возможность внести изменения в расписание
- возможность добавить нового врача
# Технологии разработки
## Язык программирования
JavaScript
## СУБД
PostgreSQL
## Frontend
React JS
## Backend
Node JS с фреймворком Express
