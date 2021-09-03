import Loader from '../components/Loader';
import Layout from '../Layout';
import Head from 'next/head';

import CardCurso from '../components/CardCurso';

import CursosContext from '../context/CursosContext';
import { useContext, useEffect } from 'react';

export default function Populares() {
  const { cursos, obtenerCursosContext, errorGetCurso } = useContext(
    CursosContext
  );

  useEffect(() => {
    if (!errorGetCurso) {
      obtenerCursosContext('votos');
    }
  }, []);

  if (!cursos) {
    return <Loader />;
  } else {
    return (
      <>
        <Head>
          <title>Cursos</title>
        </Head>
        <Layout>
          <div className='row mt-4'>
            {cursos.map((curso) => (
              <CardCurso key={curso.id} curso={curso} />
            ))}
          </div>
        </Layout>
      </>
    );
  }
}
