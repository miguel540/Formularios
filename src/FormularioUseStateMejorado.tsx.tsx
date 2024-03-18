// En este formulario sí controlamos los valores conforme se van cambiando en los input.
// El hook useState mantiene el estado de los valores que monitoriza y renderiza el componente de acuerdo a esos cambios
// En el evento onSubmit llamamos a una función que toma los valores de los valores monitorizados por los hooks useState
// Con esta técnica podríamos, por ejemplo, hacer validaciones conforme el usuario cambia los datos o hacer que el componente sea reactivo de otras maneras a los valores introducidos.

import { ChangeEvent, FormEvent, useState } from 'react';
import { IUsuario } from './interfaces/usuario.interface';

export const FormularioUseStateMejorado = () => {
  // Vamos a manejar el estado del formulario a nivel general. Esto es mucho mejor si, sobre todo, manejamos un formulario con muchos campos porque nos evita un useState por cada campo
  // Como valor por defecto le damos un objeto de tipo IUsuario con sus valores vacíos
  const [form, setForm] = useState<IUsuario>({
    email: '',
    password: ''
  });

  // Desestructuramos el email y el password. Estos valores son los que utilizaremos en el submit y los que irá cambiando el usuario gracias al useState anterior
  const { email, password } = form;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usuario: IUsuario = {
      email: email,
      password: password
    };
    console.log(usuario);
  };

  // Todos los input llaman a esta función cuando cambian sus valores. El nuevo valor del formulario constará de todos los valores del formulario (...form)
  // Y además: [ e.target.id ]: e.target.value
  // [ e.target.id ] es el id del input que llama a la función. Va con esta sintaxis entre [] porque JavaScript permite acceder a una propiedad en concreto encerrándola entre corchetes. Está técnica se llama propiedades computadas
  // e.target.value es el valor del input que llama a la función. Le decimos algo así como: Deja el formulario como está (...form) y captura el objeto con la popiedad id igual a, por ejemplo, password y dale el valor, por ejemplo 123456
//   const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setForm({
//       ...form, //mantiene el formulario como esta  a excepción del campo [e.target.id] que le pones
//       [ e.target.id ]: e.target.value //e.target.id id , tiene el valor id del input que estemos cambiando
//   });
//   };
  // Aquí lo mismo pero con desestructuración
  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => { //en vez de pasar e con todos sus valores, le pasas el campo que te interesa 'target'
    console.log(target);
    const { id, value } = target;
    setForm({
      ...form,
      [id]: value
    });
  };

  // Este mensaje se muestra cada vez que el valor de un input cambia
  console.log('Renderizado');

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input className="form-control" id="email" type="email" value={email} onChange={onInputChange} />
        {/* useState nos permite controlar en todo momento el valor del email y del password para, por ejemplo, sacar mensajes */}
        {email.trim() === '' && <small>Email obligatorio</small>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input className="form-control" id="password" type="password" value={password} onChange={onInputChange} />
        {password.trim() === '' && <small>Password obligatorio</small>}
      </div>
      <button className="btn btn-success" type="submit" disabled={email.trim() === '' || password.trim() === ''}>
        Iniciar sesión
      </button>
    </form>
  );
};

