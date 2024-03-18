// En este formulario no controlamos los valores conforme se van cambiando en los input.
// El hook useRef mantiene una referencia a un input, pero cuando el valor del input cambia, no vuelve a renderizar el componente como sí hace el hook useState
// En el evento onSubmit llamamos a una función que toma los valores de los useRef
// Esta técnica podría servirnos para obtener los datos y enviarlos, pero perdemos control en el formulario para, por ejemplo, hacer validaciones conforme el usuario cambia los datos
// o hacer que el componente sea reactivo a ciertos valores introducidos.

import { FormEvent, useRef } from 'react';
import { IUsuario } from './interfaces/usuario.interface';

export const FormularioUseRef = () => {
  // Tomamos dos referencias, una por cada input. El null final es para dar un valor inicial. Si no ponemos este null, da error de compilación
  // No es el valor inicial del valor del input, sino del input, por eso no ponemos en el valor inicial ''
  const emailRef = useRef<HTMLInputElement>(null);// useRef -> hay que tipar lo que queremos vigilar en este caso un input de html
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // emailRef.current?.value || ''
    // Como la referencia puede ser nula si no la hacemos bien en la vista, debemos poner el ?. Si la referencia es nula, asignamos al email y al password un string vacío ''
    // Sería algo así como decir: al email le pasas el valor de la referencia al input y si es nulo un string vacío.
    const usuario: IUsuario = {
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || ''
    };
    console.log(usuario);
  };

  // Este mensaje solo se muestra la primera vez porque useRef no renderiza de nuevo el componente
  console.log('Renderizado');

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input className="form-control" id="email" type="email" ref={emailRef} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input className="form-control" id="password" type="password" ref={passwordRef} />
      </div>
      <button className="btn btn-success" type="submit">
        Iniciar sesión
      </button>
    </form>
  );
};

