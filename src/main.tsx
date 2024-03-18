import React from 'react';
import ReactDOM from 'react-dom/client';
//import { FormularioUseRef } from './FormularioUseRef';

import 'bootstrap/dist/css/bootstrap.css';
import { FormularioUseState } from './FormularioUseState';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <FormularioUseRef /> */}
    <FormularioUseState></FormularioUseState>
  </React.StrictMode>
);