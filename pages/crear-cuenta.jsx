import React, { useContext, useState } from 'react';
import Router from 'next/router';
import Layout from '../Layout';

import useValidation from '../hooks/useValidation';
import { validarCrearCuenta } from '../utils/validaciones';

import { FirebaseContext } from '../firebase';

const initialState = {
  nombre: '',
  email: '',
  password: '',
};

const CrearCuenta = () => {
  const [
    valores,
    errores,
    handleChange,
    handleSubmit,
  ] = useValidation(initialState, validarCrearCuenta, () => crearCuenta());

  const { firebase } = useContext(FirebaseContext);

  const crearCuenta = async () => {
    console.log('pasamos ahora vamos a crear la cuenta');
    console.log(valores);
    const { nombre, email, password } = valores;

    try {
      await firebase.crear(nombre, email, password);
      Router.push('/');
    } catch (error) {
      console.log('error al crear usuario');
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <h1 className='text-center'>crear cuenta</h1>
        <form
          onSubmit={handleSubmit}
          noValidate={true}
          style={{ maxWidth: '30em', margin: '0px auto' }}
        >
          <div className='form-group'>
            <label htmlFor='exampleInputEmail1'>Nombre</label>
            <input
              type='text'
              className='form-control'
              name='nombre'
              onChange={handleChange}
            />
            {errores.nombre && (
              <span style={{ fontSize: '14px', color: 'red' }}>
                {errores.nombre}
              </span>
            )}
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputEmail1'>Correo</label>
            <input
              type='email'
              className='form-control'
              name='email'
              onChange={handleChange}
            />
            {errores.email && (
              <span style={{ fontSize: '14px', color: 'red' }}>
                {errores.email}
              </span>
            )}
          </div>
          <div className='form-group'>
            <label htmlFor='exampleInputPassword1'>Contraseña</label>
            <input
              type='password'
              className='form-control'
              name='password'
              onChange={handleChange}
            />
            {errores.password && (
              <span style={{ fontSize: '14px', color: 'red' }}>
                {errores.password}
              </span>
            )}
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-primary'>
              crear cuenta{' '}
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default CrearCuenta;
