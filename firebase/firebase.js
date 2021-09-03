import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebaseConfig from './config';

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  async iniciar(email, password) {
    const resultado = await this.auth.signInWithEmailAndPassword(
      email,
      password
    );
    console.log('mira el resultado', resultado.user);

    localStorage.setItem('usuarioStorage', JSON.stringify(resultado.user));

    return resultado;
  }

  async crear(nombre, email, password) {
    const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    const usuarioUpdate = await nuevoUsuario.user.updateProfile({
      displayName: nombre,
    });

    localStorage.setItem('usuarioStorage', JSON.stringify(nuevoUsuario.user));

    return usuarioUpdate;
  }

  async cerrar() {
    localStorage.removeItem('usuarioStorage');
    await this.auth.signOut();
  }
}

const firebase = new Firebase();

export default firebase;
