import React from 'react';
import Link from 'next/link';

const Botones = ({ estaLogeado, usuario, cerrar }) => {
  return (
    <>
      {estaLogeado ? (
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <p className='nav-link m-0'>
              <strong>Hola: {usuario.displayName} </strong>
            </p>
          </li>
          <li className='nav-item'>
            <button className='mt-1 btn btn-danger btn-sm' onClick={() => cerrar()}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      ) : (
        <ul className='navbar-nav ml-auto'>
          <Link href='/login'>
            <li className='nav-item mr-1'>
              <button className='mt-1 btn btn-success btn-sm'>Login</button>
            </li>
          </Link>
          <Link href='/crear-cuenta'>
            <li className='nav-item'>
              <button className='mt-1 btn btn-info btn-sm'>Crear cuenta</button>
            </li>
          </Link>
        </ul>
      )}
    </>
  );
};

export default Botones;
