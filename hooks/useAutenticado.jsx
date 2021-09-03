import React, { useEffect, useState } from 'react';

import firebase from '../firebase';

const useAutenticado = () => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  const [consultando, setConsultando] = useState(true);

  useEffect(() => {
    const usarioStorage = JSON.parse(localStorage.getItem('usuarioStorage'));
    if (usarioStorage) {
      setUsuarioAutenticado(usarioStorage);
    } else {
      const unsuscribe = firebase.auth.onAuthStateChanged((user) => {
        if (user) {
          setUsuarioAutenticado(user);
        } else {
          setUsuarioAutenticado(null);
        }
        setConsultando(false);
        return () => unsuscribe();
      });
    }
  }, []);

  return [usuarioAutenticado, consultando];
};

export default useAutenticado;
