import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../firebase';
import { useRouter } from 'next/router';

export const useCurso = (id) => {
  const [curso, setCurso] = useState({});
  const [error, setError] = useState(false);
  const [comentario, setComentario] = useState({});
  const [consultarDB, setConsultarDB] = useState(true);
  const [loaderMeGusta, setLoaderMeGusta] = useState(false);
  const [loaderEliminar, setLoaderEliminar] = useState(false);

  const { firebase, usuario } = useContext(FirebaseContext);
  const router = useRouter();

  useEffect(() => {
    if (id && consultarDB) {
      obtenerCurso();
    }
  }, [id, consultarDB]);

  const { comentarios, votos, creador, votantes, nombreImagen } = curso;

  const obtenerCurso = async () => {
    console.log('ejecutandose');
    const cursoQuery = await firebase.db.collection('cursos').doc(id);
    const curso = await cursoQuery.get();
    if (curso.exists) {
      setCurso(curso.data());
      setConsultarDB(false);
    } else {
      setError(true);
      setConsultarDB(false);
    }
  };

  const votarCurso = async () => {
    const votosAcumulados = votos + 1;

    if (votantes.includes(usuario.uid)) return;

    const nuevaListaDeVotantes = [...votantes, usuario.uid];

    setLoaderMeGusta(true);

    try {
      await firebase.db
        .collection('cursos')
        .doc(id)
        .update({ votos: votosAcumulados, votantes: nuevaListaDeVotantes });
      setConsultarDB(true);
      setLoaderMeGusta(false);
    } catch (error) {
      console.log('error');
      console.log(error);
      setLoaderMeGusta(false);
    }
  };

  const comentarioCHange = (e) => {
    setComentario({ ...comentario, [e.target.name]: e.target.value });
  };

  const agregarComentario = async (e) => {
    e.preventDefault();

    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;

    const nuevoComentarios = [...comentarios, comentario];

    try {
      await firebase.db.collection('cursos').doc(id).update({
        comentarios: nuevoComentarios,
      });
      setCurso({
        ...curso,
        comentarios: nuevoComentarios,
      });
      setConsultarDB(true);
    } catch (error) {
      console.log(error);
    }
  };

  const elimiarCurso = async () => {
    if (!usuario) return router.push('/');
    if (creador.id !== usuario.uid) {
      return router.push('/');
    }
    setLoaderEliminar(true);

    try {
      await firebase.db.collection('cursos').doc(id).delete();
      await firebase.storage.ref('cursos').child(nombreImagen).delete();
      router.push('/');
      setLoaderEliminar(false);
    } catch (error) {
      console.log(error);
      setLoaderEliminar(false);
    }
  };

  return [
    curso,
    usuario,
    error,
    loaderMeGusta,
    votarCurso,
    comentarioCHange,
    agregarComentario,
    elimiarCurso,
  ];
};
