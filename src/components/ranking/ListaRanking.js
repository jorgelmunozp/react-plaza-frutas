import React from 'react';

export const ListaRanking = ({items,tiempo}) => {
    return (
      <ol>
        {items.map(item => (
          <li key={item}>{item.nombre} {tiempo - item.tiempo} seg {item.puntos * (tiempo-item.tiempo)} ptos</li>
        ))}
      </ol>
    );
}