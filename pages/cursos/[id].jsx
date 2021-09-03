import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

import Layout from '../../Layout';
import Loader from '../../components/Loader';
import { useRouter } from 'next/router';

import { useCurso } from '../../hooks/useCurso';

const Cursos = () => {
  const router = useRouter();

  const {
    query: { id },
  } = router;

  const [
    curso,
    usuario,
    error,
    loaderMeGusta,
    votarCurso,
    comentarioCHange,
    agregarComentario,
    elimiarCurso,
  ] = useCurso(id);

  const {
    comentarios,
    creado,
    creador,
    descripcion,
    empresa,
    nombre,
    nombreImagen,
    url,
    urlImage,
    votantes,
    votos,
  } = curso;

  const puedeEliminarCurso = () => {
    if (!usuario) return false;
    if (creador.id === usuario.uid) {
      return true;
    }
  };

  if (Object.keys(curso).length === 0 && !error) return <Loader />;

  return (
    <Layout>
      <main className='container'>
        <section className='row'>
          <div className='col-md-12 mt-4'>
            <h4 className='text-center'>{nombre}</h4>
          </div>
          <div className='col-md-6'>
            <small className='text-muted'>
              Publicado hace{' '}
              {formatDistanceToNow(new Date(creado), { locale: es })}
            </small>
            <img src={urlImage} className='img-fluid' alt={nombreImagen} />

            {usuario && (
              <>
                <h4 className='mt-2'>Agregar comentario</h4>
                <form className='row' onSubmit={agregarComentario}>
                  <div className='col-9'>
                    <input
                      type='text'
                      className='form-control'
                      name='mensaje'
                      onChange={comentarioCHange}
                    />
                  </div>
                  <div className='col-3'>
                    <button type='submit' className='btn btn-primary btn-block'>
                      Agregar
                    </button>
                  </div>
                </form>
              </>
            )}

            <h4 className='mt-3'>Comentarios</h4>
            {comentarios.length === 0 ? (
              <p>Se el primero en dejar tu comentario</p>
            ) : (
              <ul className='list-group'>
                {comentarios.map((comentario, index) => (
                  <li key={index} className='list-group-items'>
                    {comentario.mensaje}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className='col-md-6'>
            <div className='row'>
              <div className='col-12'>
                <div className='mt-4'>
                  <a
                    href={url}
                    target='_blank'
                    type='button'
                    className='btn btn-info'
                  >
                    <i
                      className='fa fa-long-arrow-right'
                      aria-hidden='true'
                    ></i>{' '}
                    ir a la página oficial
                  </a>
                </div>
                <div className='mt-3'>
                  {usuario && (
                    <button
                      type='button'
                      className='btn btn-danger mr-2'
                      onClick={votarCurso}
                    >
                      Me gusta{' '}
                      <i className='fa fa-heart-o' aria-hidden='true'></i>{' '}
                    </button>
                  )}

                  {loaderMeGusta ? (
                    <div className='spinner-border text-primary'>
                      <span className='sr-only'></span>
                    </div>
                  ) : (
                    <span
                      className='badge badge-primary'
                      style={{ fontSize: '20px' }}
                    >
                      {votos}{' '}
                      <i className='fa fa-heart-o' aria-hidden='true'></i>{' '}
                    </span>
                  )}
                </div>
                <div></div>
              </div>
              <div className='col-12 mt-2'>
                <h4>
                  Descripción{' '}
                  <small className='text-muted'>(empresa: {empresa})</small>
                </h4>
                <small className='text-muted'>
                  (publicado por : {creador.nombre})
                </small>
                <p>{descripcion}</p>
              </div>
              {puedeEliminarCurso() && (
                <div className='col-md-12'>
                  <button
                    className='btn btn-danger btn-block'
                    onClick={elimiarCurso}
                  >
                    Eliminar Curso{' '}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Cursos;
