export default (state, action) => {
  switch (action.type) {
    case 'LOADING_ADD_CURSO':
      return {
        ...state,
        loadingAddCurso: true,
        addCursoOk: false,
        errorAddCurso: null,
      };
    case 'ADD_CURSO_OK':
      return {
        ...state,
        addCursoOk: true,
        loadingAddCurso: false,
        errorAddCurso: null,
      };
    case 'ADD_CURSO_ERROR':
      return {
        ...state,
        addCursoOk: false,
        loadingAddCurso: false,
        errorAddCurso: 'Hubo un error al crear el curso',
      };
    case 'LOADING_GET_CURSOS':
      return {
        ...state,
        loadingGetCursos: true,
      };

    case 'GET_CURSO_OK':
      return {
        ...state,
        cursos: action.payload,
        loadingGetCursos: false,
        errorGetCurso: null,
        addCursoOk: false,
      };

    case 'GET_CURSO_ERROR':
      return {
        ...state,
        addCursoOk: false,
        loadingGetCursos: false,
        errorGetCurso: 'Hubo un error al obtener los cursos',
      };

    default:
      return state;
  }
};
