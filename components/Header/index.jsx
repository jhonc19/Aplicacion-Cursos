import React, { useContext, useEffect, useState } from 'react';
import Buscador from './Buscador';
import Navegacion from './Navegacion';
import Botones from './Botones';

import { FirebaseContext } from '../../firebase';

const Header = () => {
  const [estaLogeado, setEstaLogeado] = useState(false);

  const { firebase, usuario } = useContext(FirebaseContext);

  useEffect(() => {
    if (usuario) {
      setEstaLogeado(true);
    } else {
      setEstaLogeado(false);
    }
  }, [usuario]);

  const cerrarSesion = () => {
    console.log('cerrando sesion');
    firebase.cerrar();
    setEstaLogeado(false);
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <a className='navbar-brand' href='/'>
        Logo
      </a>
      <div className='collapse navbar-collapse'>
        <Buscador />
        <Navegacion estaLogeado={estaLogeado} />
        <Botones
          estaLogeado={estaLogeado}
          usuario={usuario}
          cerrar={cerrarSesion}
        />
      </div>
    </nav>
  );
};

export default Header;
