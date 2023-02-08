import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {TIMETABLE_ROUTE} from "../utils/consts";
import {Context} from "../index";
const AppRouter = () => {
  const {pacient} = useContext(Context)
  const {doct} = useContext(Context)
  return (
    <Routes>
    {doct.isDoc && authRoutes.map(({path, Component}) =>
      <Route key={path} path={path} element={<Component/>} exact/>
    )}
      {pacient.isAuth && authRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={<Component/>} exact/>
      )}
      {publicRoutes.map(({path, Component}) =>
      <Route key={path} path={path} element={<Component/>} exact/>
      )}
      <Route path='*' element={<Navigate to={TIMETABLE_ROUTE}/>} />
    </Routes>
  );
};
export default AppRouter;
