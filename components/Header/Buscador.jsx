import React, { useState } from 'react';
import Router from 'next/router';

const Buscador = () => {
  const [busqueda, setBusqueda] = useState('');

  const buscarCurso = (e) => {
    e.preventDefault();
    console.log(busqueda);
    Router.push({
      pathname: '/buscar',
      query: {
        q: busqueda,
      },
    });
  };
  return (
    <form onSubmit={buscarCurso} className='form-inline my-2 my-lg-0'>
      <input
        className='form-control mr-sm-2'
        type='search'
        placeholder='Buscador de cursos'
        aria-label='Search'
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>
        Buscar
      </button>
    </form>
  );
};

export default Buscador;
