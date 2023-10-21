import React from 'react';
import bloque from '../../assets/bloque.svg';

export const Cuadrilatero = ({id,orientation,cantidadBloquesH,cantidadBloquesV}) => {
  if(orientation === 'horizontal') {
    return (
      <div id={id} className="App-cuadrilateroH">
        <ol>
          {cantidadBloquesH.map(cantidadBloquesH => (
            <img id={cantidadBloquesH} src={bloque} className="App-bloque" alt="🧱" />        ))}
        </ol>
      </div>
    );
  } else if(orientation === 'vertical') {
    return (
      <div id={id} className="App-cuadrilateroV">
        <ol>
          {cantidadBloquesV.map(cantidadBloquesV => (
            <img id={cantidadBloquesV} src={bloque} className="App-bloque" alt="🧱" />        ))}
        </ol>
      </div>
    );
  }
}