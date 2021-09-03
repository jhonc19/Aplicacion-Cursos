export const validarCrearCuenta = (valores) => {
  let errores = {};
  validarNombre(valores.nombre, errores);
  validarEmail(valores.email, errores);
  validarPassword(valores.password, errores);

  return errores;
};

export const validarIniciarSesion = (valores) => {
  let errores = {};
  validarEmail(valores.email, errores);
  validarPassword(valores.password, errores);

  return errores;
};

export const validarCrearCurso = (valores) => {
  let errores = {};
  validarNombre(valores.nombre, errores);
  validarEmpresa(valores.nombre, errores);
  validarUrl(valores.url, errores);
  validarDescripcion(valores.descripcion, errores);

  return errores;
};

const validarNombre = (nombre, errores) => {
  if (!nombre) {
    errores.nombre = 'El nombre es obligatorio';
  }
};

const validarEmpresa = (empresa, errores) => {
  if (!empresa) {
    errores.empresa = 'La empresa es obligatoria';
  }
};

const validarDescripcion = (descripcion, errores) => {
  if (!descripcion) {
    errores.descripcion = 'La descripción es obligatoria';
  }
};

const validarUrl = (url, errores) => {
  if (!url) {
    errores.url = 'La URL del curso es obligatoria';
  } else if (!/^(ftp|http|https):\/\/[^"]+$/.test(url)) {
    errores.url = 'El formato es incorrecto';
  }
};

const validarEmail = (email, errores) => {
  if (!email) {
    errores.email = 'El correo es obligatorio';
  } else {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errores.email = 'El correo no es válido';
    }
  }
};

const validarPassword = (password, errores) => {
  if (!password) {
    errores.password = 'la contraseña es obligatoria';
  } else {
    if (password.length < 6) {
      errores.password = 'la contraseña debe tener al menos 6 caracteres';
    }
  }
};
