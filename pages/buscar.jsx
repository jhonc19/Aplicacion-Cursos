import Loader from '../components/Loader';
import Layout from '../Layout';
import Head from 'next/head';

import CardCurso from '../components/CardCurso';

import CursosContext from '../context/CursosContext';
import { useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

export default function Home() {
  const [resultado, setResultado] = useState([]);
  const router = useRouter();

  const {
    query: { q },
  } = router;

  const { cursos, obtenerCursosContext, errorGetCurso } = useContext(
    CursosContext
  );

  useEffect(() => {
    if (!errorGetCurso) {
      obtenerCursosContext();
    }
  }, []);

  useEffect(() => {
    if (cursos && cursos.length > 0) {
      console.log('mira el q');
      const busqueda = q.toLowerCase();
      const filtro = cursos.filter((curso) => {
        return (
          curso.descripcion.toLowerCase().includes(busqueda) ||
          curso.nombre.toLowerCase().includes(busqueda)
        );
      });
      setResultado(filtro);
      console.log('cursos filtrados');
      console.log(filtro);
    }
  }, [q, cursos]);

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
            <>
              {resultado.length > 0 ? (
                resultado.map((curso) => (
                  <CardCurso key={curso.id} curso={curso} />
                ))
              ) : (
                <div className='alert alert-warning m.auto'>
                  Por el momento no tenemos cursos disponibles
                </div>
              )}
            </>
          </div>
        </Layout>
      </>
    );
  }
}
