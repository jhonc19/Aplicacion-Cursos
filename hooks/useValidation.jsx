import React, { useEffect, useState } from 'react';

const useValidation = (initialState, validar, fn) => {
  const [valores, setValores] = useState(initialState);
  const [errores, setErrores] = useState({});
  const [solicitud, setSolicitud] = useState(false);

  useEffect(() => {
    if (solicitud) {
      const noHayErrores = Object.keys(errores).length === 0;
      if (noHayErrores) {
        fn();
      }
      setSolicitud(false);
    }
  }, [errores]);

  const handleChange = (e) => {
    setValores({ ...valores, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validar(valores);
    setErrores(erroresValidacion);
    setSolicitud(true);
  };

  return [valores, errores, handleChange, handleSubmit];
};

export default useValidation;
