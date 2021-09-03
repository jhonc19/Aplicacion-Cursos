import React, { useReducer } from 'react';

import CursosContext from './CursosContext';
import CursosReducer from './CursosReducer';

import firebase from '../firebase';

const CursosState = (props) => {
  const initialState = {
    addCursoOk: false,
    loadingAddCurso: false,
    errorAddCurso: null,
    cursos: null,
    loadingGetCursos: false,
    errorGetCurso: null,
  };

  const crearCursoContext = async (curso) => {
    dispatch({
      type: 'LOADING_ADD_CURSO',
    });

    try {
      await firebase.db.collection('cursos').add(curso);
      dispatch({
        type: 'ADD_CURSO_OK',
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ADD_CURSO_ERROR',
      });
    }
  };

  const obtenerCursosContext = async (orden = 'creado') => {
    dispatch({
      type: 'LOADING_GET_CURSOS',
    });

    try {
      const doc = await firebase.db
        .collection('cursos')
        .orderBy(orden, 'desc')
        .get();

      const cursos = [];
      doc.forEach((item) => cursos.push({ id: item.id, ...item.data() }));

      console.log("mira los cursos");
      console.log(cursos);

      dispatch({
        type: 'GET_CURSO_OK',
        payload: cursos,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'GET_CURSO_ERROR',
      });
    }
  };

  const [state, dispatch] = useReducer(CursosReducer, initialState);

  return (
    <CursosContext.Provider
      value={{
        addCursoOk: state.addCursoOk,
        loadingAddCurso: state.loadingAddCurso,
        errorAddCurso: state.errorAddCurso,
        cursos: state.cursos,
        loadingGetCursos: state.loadingGetCursos,
        errorGetCurso: state.errorGetCurso,
        crearCursoContext,
        obtenerCursosContext,
      }}
    >
      {props.children}
    </CursosContext.Provider>
  );
};

export default CursosState;
