import React from 'react';
import bloque from '../../assets/bloque.svg';

export const Cuadrilatero = ({id,orientation,cantidadBloquesH,cantidadBloquesV,blockWidth}) => {
  if(orientation === 'horizontal') {
    return (
      <div id={id} className="cuadrilateroHorizontales">
        <ol>
          {cantidadBloquesH.map(cantidadBloquesH => (
            <img id={cantidadBloquesH} src={bloque} className="cuadrilateroBloque" alt="🧱" style={{'width': blockWidth}} />))}
        </ol>
      </div>
    );
  } else if(orientation === 'vertical') {
    return (
      <div id={id} className="cuadrilateroVerticales">
        <ol>
          {cantidadBloquesV.map(cantidadBloquesV => (
            <img id={cantidadBloquesV} src={bloque} className="cuadrilateroBloque" alt="🧱" style={{'width': blockWidth}}/>))}
        </ol>
      </div>
    );
  }
}