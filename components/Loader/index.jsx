import React from 'react';
import style from '../../styles/loader.module.css'

const Loader = () => {
  return (
    <section className={style.contenedorLogin}>
      <div className={style.loading}>Loading</div>
      <div className={style.circle}></div>
      <div className={style.circle}></div>
      <div className={style.circle}></div>
    </section>
  );
};

export default Loader;
