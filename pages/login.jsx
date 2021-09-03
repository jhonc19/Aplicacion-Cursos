import React, { useContext, useState } from 'react';
import Router from 'next/router';
import Layout from '../Layout';

import useValidation from '../hooks/useValidation';
import { validarIniciarSesion } from '../utils/validaciones';
import { FirebaseContext } from '../firebase';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [
    valores,
    errores,
    handleChange,
    handleSubmit,
  ] = useValidation(initialState, validarIniciarSesion, () => iniciarSesion());

  const [procesar, setProcesar] = useState(false);

  const { firebase } = useContext(FirebaseContext);

  const iniciarSesion = async () => {
    console.log('pasamos ahora vamos a iniciar sesion');
    console.log(valores);
    const { email, password } = valores;
    setProcesar(true);
    try {
      await firebase.iniciar(email, password);
      Router.push('/');
      setProcesar(false);
    } catch (error) {
      console.log('error', error);
      setProcesar(false);
    }
  };

  return (
    <>
      <Layout>
        <h1 className='text-center'>Iniciar Sesión</h1>
        <form
          onSubmit={handleSubmit}
          noValidate={true}
          style={{ maxWidth: '30em', margin: '0px auto' }}
        >
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
              iniciar{' '}
              {procesar && (
                <span className='spinner-border spinner-border-sm'></span>
              )}
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default Login;
