import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';

const Navegacion = ({ estaLogeado }) => {
  const [localPath, setLocalPath] = useState('');

  useEffect(() => {
    setLocalPath(Router.router.asPath);
  }, []);

  return (
    <ul className='navbar-nav m-auto'>
      <li className={('nav-item', localPath === '/' ? 'active' : '')}>
        <Link href='/'>
          <a className='nav-link'>Inicio</a>
        </Link>
      </li>
      <li className={('nav-item', localPath === '/populares' ? 'active' : '')}>
        <Link href='/populares'>
          <a className='nav-link'>Populares</a>
        </Link>
      </li>
      {estaLogeado && (
        <li
          className={('nav-item', localPath === '/nuevo-curso' ? 'active' : '')}
        >
          <Link href='/nuevo-curso'>
            <a className='nav-link'>Nuevo Curso</a>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Navegacion;
