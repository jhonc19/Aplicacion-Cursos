import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Layout';

import useValidation from '../hooks/useValidation';
import { validarCrearCurso } from '../utils/validaciones';

import { FirebaseContext } from '../firebase';
import CursosContext from '../context/CursosContext';

import { useRouter } from 'next/router';

const initialState = {
  nombre: '',
  empresa: '',
  imagen: '',
  url: '',
  descripcion: '',
};

const NuevoCurso = () => {
  const [
    valores,
    errores,
    handleChange,
    handleSubmit,
  ] = useValidation(initialState, validarCrearCurso, () => crearCurso());
  const [nombreImagen, setNombreImagen] = useState('');
  const [urlImage, setUrlImage] = useState(null);
  const [loadingUpImage, setLoadingUpImage] = useState(false);

  const { nombre, empresa, url, descripcion } = valores;
  const { firebase, usuario } = useContext(FirebaseContext);

  const {
    addCursoOk,
    loadingAddCurso,
    errorAddCurso,
    crearCursoContext,
  } = useContext(CursosContext);

  const router = useRouter();

  useEffect(() => {
    if (addCursoOk) {
      router.push('/');
    }
  }, [addCursoOk]);

  const handleUploadImage = (e) => {
    console.log('mira la info');
    console.log(e.target.files[0]);
    const image = e.target.files[0];

    setLoadingUpImage(true);

    const uploadTask = firebase.storage.ref(`/cursos/${image.name}`).put(image);

    uploadTask.on(
      'state_changed',
      (snapShot) => {
        console.log('snapShot');
        console.log(snapShot);
      },
      (error) => {
        console.log('error');
        console.log(error);
      },
      (event) => {
        firebase.storage
          .ref('cursos')
          .child(image.name)
          .getDownloadURL()
          .then((firebaseUrl) => {
            console.log('mira la URL');
            console.log(firebaseUrl);
            setNombreImagen(image.name);
            setUrlImage(firebaseUrl);
            setLoadingUpImage(false);
          });
      }
    );
  };

  const crearCurso = () => {
    console.log('vamos a crear el curso');
    const curso = {
      nombre,
      empresa,
      url,
      descripcion,
      urlImage,
      nombreImagen,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      votantes: [],
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName,
      },
    };
    console.log(curso);
    crearCursoContext(curso);
  };

  return (
    <>
      <Layout>
        <h1 className='text-center'>crear nuevo curso</h1>
        <form onSubmit={handleSubmit} className='jumbotron' noValidate={true}>
          <div className='form-row'>
            <div className='form-group col-md-6'>
              <label htmlFor='nombre'>Nombre</label>
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
            <div className='form-group col-md-6'>
              <label htmlFor='empresa'>Empresa</label>
              <input
                type='text'
                className='form-control'
                name='empresa'
                onChange={handleChange}
              />
              {errores.empresa && (
                <span style={{ fontSize: '14px', color: 'red' }}>
                  {errores.empresa}
                </span>
              )}
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-6'>
              <label htmlFor='empresa'>Url</label>
              <input
                type='text'
                className='form-control'
                name='url'
                onChange={handleChange}
              />
              {errores.url && (
                <span style={{ fontSize: '14px', color: 'red' }}>
                  {errores.url}
                </span>
              )}
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='archivo'>Subir Archivo</label> <br />
              <input
                type='file'
                accept='image/*'
                name='imagen'
                onChange={handleUploadImage}
              />
              {loadingUpImage && (
                <div className='spinner-border text-info'>
                  <span className='sr-only'>Cargando ...</span>
                </div>
              )}
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-12'>
              <label htmlFor='exampleFormControlTextarea1'>
                Descripción del curso
              </label>
              <textarea
                className='form-control'
                name='descripcion'
                rows='3'
                onChange={handleChange}
              ></textarea>
              {errores.descripcion && (
                <span style={{ fontSize: '14px', color: 'red' }}>
                  {errores.descripcion}
                </span>
              )}
            </div>
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-primary'>
              crear curso{' '}
              {loadingAddCurso && (
                <span className='spinner-border spinner-border-sm'></span>
              )}
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default NuevoCurso;
