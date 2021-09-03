import 'bootstrap/dist/css/bootstrap.css';

import firebase, { FirebaseContext } from '../firebase';
import useAutenticado from '../hooks/useAutenticado';
import CursosState from '../context/CursosState';

function MyApp({ Component, pageProps }) {
  const [usuarioAutenticado, consultando] = useAutenticado();

  return (
    <FirebaseContext.Provider
      value={{ firebase, usuario: usuarioAutenticado, consultando }}
    >
      <CursosState>
        <Component {...pageProps} />
      </CursosState>
    </FirebaseContext.Provider>
  );
}

export default MyApp;
