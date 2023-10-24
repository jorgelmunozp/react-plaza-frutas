import React from 'react';
import { faClock, faDollarSign} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";     //Importa iconos fontawesome

export const ListaRanking = ({items,tiempo}) => {
    return (
      <ol>
        {items.map(item => (
          <li key={item}>{item.nombre} <FontAwesomeIcon icon={faClock} /> {tiempo - item.tiempo}s <FontAwesomeIcon icon={faDollarSign} /> {Math.round(item.puntos/(tiempo-item.tiempo))*10}</li>
        ))}
      </ol>
    );
}