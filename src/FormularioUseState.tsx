// En este formulario sí controlamos los valores conforme se van cambiando en los input.
// El hook useState mantiene el estado de los valores que monitoriza y renderiza el componente de acuerdo a esos cambios.
// En el evento onSubmit llamamos a una función que toma los valores monitorizados por los hooks useState
// Con esta técnica podríamos, por ejemplo, hacer validaciones conforme el usuario cambia los datos o hacer que el componente sea reactivo de otras maneras a los valores introducidos.

import { ChangeEvent, FormEvent, useState } from 'react';
import { IUsuario } from './interfaces/usuario.interface';

export const FormularioUseState = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usuario: IUsuario = {
      email: email,
      password: password
    };
    console.log(usuario);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Este mensaje se muestra cada vez que el valor de un input cambia
  console.log('Renderizado');

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input className="form-control" id="email" type="email" value={email} onChange={onChangeEmail} />
        {/* useState nos permite controlar en todo momento el valor del email y del password para, por ejemplo, sacar mensajes */}
        {email.trim() === '' && <small>Email obligatorio</small>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input className="form-control" id="password" type="password" value={password} onChange={onChangePassword} />
        {password.trim() === '' && <small>Password obligatorio</small>}
      </div>
      <button className="btn btn-success" type="submit" disabled={email.trim() === '' || password.trim() === ''}>
        Iniciar sesión
      </button>
    </form>
  );
};
