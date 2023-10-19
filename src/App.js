import logo from './logo.png';
import dog from './dog.png';
import gusano from './gusano.svg';
import manzana from './manzana.svg';
import banano from './banano.svg';
import mango from './mango.svg';
import fresa from './fresa.svg';
import cajamadera from './cajamadera.svg';
import bloque from './bloque.png';
import bloquesH from './bloquesH.png';
import bloquesV from './bloquesV.png';

import './App.css';

import React from 'react';
import { ListaRanking } from './components/ranking/ListaRanking';

import { faCaretUp, faCaretDown, faCaretLeft, faCaretRight, faClock, faPlayCircle, faFrown, faRedoAlt, faSmile, faMeh, faLemon} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";     //Importa iconos fontawesome
import swalert from '@sweetalert/with-react';                         //Libreria alertas con diseño en JSX

const dogname = "Doggy";
const tiempo = 20;
const vidas = 3;
const cantidadfrutas = 4;

let dogH;
let dogV;
let gusanoH;
let gusanoV;
let manzanaH;
let manzanaV; 
let bananoH; 
let bananoV; 
let mangoH; 
let mangoV; 
let fresaH; 
let fresaV;
let obstaculo1H; 
let obstaculo1V;
let obstaculo2H; 
let obstaculo2V;

const sizeWindow = document.documentElement.clientWidth;
if(sizeWindow <= 600) {
    dogH = -10;
    dogV = 150;
    gusanoH = -7.5;
    gusanoV = 0;
    manzanaH = 90;
    manzanaV = 5;
    bananoH = -100; 
    bananoV = 5;
    mangoH = 90; 
    mangoV = 150;
    fresaH = -100; 
    fresaV = 150;
    obstaculo1H = 40; 
    obstaculo1V = 40;
    obstaculo2H = obstaculo1H - 100; 
    obstaculo2V = obstaculo1V + 55;
} else if(600 <= sizeWindow && sizeWindow <= 1200) {
    dogH = -40;
    dogV = 490;
    gusanoH = -30;
    gusanoV = 0;
    manzanaH = 300;
    manzanaV = 30;
    bananoH = -330; 
    bananoV = 30;
    mangoH = 300; 
    mangoV = 480;
    fresaH = -330; 
    fresaV = 480;
    obstaculo1H = 120; 
    obstaculo1V = 125;
    obstaculo2H = obstaculo1H - 310; 
    obstaculo2V = obstaculo1V + 210;
} else if(sizeWindow >= 1200) {
    dogH = -45;
    dogV = 590;
    gusanoH = -30;
    gusanoV = 0; 
    manzanaH = 310;
    manzanaV = 40;
    bananoH = -380; 
    bananoV = 40;
    mangoH = 300; 
    mangoV = 570;
    fresaH = -380; 
    fresaV = 570;
    obstaculo1H = 130; 
    obstaculo1V = 135;
    obstaculo2H = obstaculo1H - 330; 
    obstaculo2V = obstaculo1V + 260;
}

function setPositionXY(dogH,dogV,gusanoH,gusanoV) {
  const elemento = document.getElementById('cajamadera');
  console.log("elemento" + elemento);
  const posicion = elemento.getBoundingClientRect();
  const posVFrutas = Math.round((posicion.top + posicion.bottom)/2);
  console.log("posVFrutas" + posVFrutas);

  // return [dogH,dogV]
}

// function App() {
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { segundos:tiempo, nombre:'', vidas:vidas, frutas:0, items: [], posicionHdog:dogH, posicionVdog:dogV, posicionHgusano:gusanoH, posicionVgusano:gusanoV, posicionHmanzana:manzanaH, posicionVmanzana:manzanaV, posicionHbanano:bananoH, posicionVbanano:bananoV, posicionHmango:mangoH, posicionVmango:mangoV, posicionHfresa:fresaH, posicionVfresa:fresaV, posicionHobstaculo1:obstaculo1H, posicionVobstaculo1:obstaculo1V,  posicionHobstaculo2:obstaculo2H, posicionVobstaculo2:obstaculo2V, estado:''  };
    this.campoNombre = this.campoNombre.bind(this);
    this.botonStart = this.botonStart.bind(this);
    this.flechasTeclado = this.flechasTeclado.bind(this);
    this.botonUp = this.botonUp.bind(this);
    this.botonDown = this.botonDown.bind(this);
    this.botonLeft = this.botonLeft.bind(this);
    this.botonRight = this.botonRight.bind(this);
    this.botonReset = this.botonReset.bind(this);
  }

  tick() {
    // [dogH,dogV] = setPositionXY(dogH,dogV);
    // console.log("[dogH,dogV]: " + [dogH,dogV]);

    if(this.state.estado === 'start'){
      this.setState(state => ({
        segundos: state.segundos - 1,
        nombre: this.state.nombre,
      }));
    }
    if(this.state.segundos === 0 && this.state.frutas < cantidadfrutas * 100 && this.state.vidas > 0){     //Calcula tiempo, cantidad de frutas y si tiene vidas el jugador
        this.vidas();
    } else if(this.state.vidas === 0){     //Calcula tiempo, cantidad de frutas y si tiene vidas el jugador
      swalert(
        <div>
          <img src={logo} alt="logo" style={{'height':'10vmin'}} />
          <h1> {dogname} está <FontAwesomeIcon icon={faFrown} /></h1>
          <p>Vamos {this.state.nombre}, juega de nuevo!</p>
        </div>
      )
      this.reset();
    }
  }

  tickGusano() {
    if(this.state.estado === 'start'){
      if(this.state.posicionHdog > this.state.posicionHgusano && this.state.posicionVdog > this.state.posicionVgusano){           //Hace que el Gusano persiga a dog
        this.state.posicionHgusano = this.state.posicionHgusano + 10;
        this.state.posicionVgusano = this.state.posicionVgusano + 10;
      } else if(this.state.posicionHdog > this.state.posicionHgusano && this.state.posicionVdog < this.state.posicionVgusano){           
        this.state.posicionHgusano = this.state.posicionHgusano + 10;
        this.state.posicionVgusano = this.state.posicionVgusano - 10;
      } else if(this.state.posicionHdog === this.state.posicionHgusano && this.state.posicionVdog > this.state.posicionVgusano){     
        this.state.posicionVgusano = this.state.posicionVgusano + 10;
      } else if(this.state.posicionHdog === this.state.posicionHgusano && this.state.posicionVdog < this.state.posicionVgusano){  
        this.state.posicionVgusano = this.state.posicionVgusano - 10;
      } else if(this.state.posicionHdog < this.state.posicionHgusano && this.state.posicionVdog > this.state.posicionVgusano){
        this.state.posicionHgusano = this.state.posicionHgusano - 10;
        this.state.posicionVgusano = this.state.posicionVgusano + 10;
      } else if(this.state.posicionHdog < this.state.posicionHgusano && this.state.posicionVdog < this.state.posicionVgusano){
        this.state.posicionHgusano = this.state.posicionHgusano - 10;
        this.state.posicionVgusano = this.state.posicionVgusano - 10;
      } else if(this.state.posicionHdog > this.state.posicionHgusano && this.state.posicionVdog === this.state.posicionVgusano){           //Hace que el Gusano persiga a dog
        this.state.posicionHgusano = this.state.posicionHgusano + 10;
      } else if(this.state.posicionHdog < this.state.posicionHgusano && this.state.posicionVdog === this.state.posicionVgusano){           //Hace que el Gusano persiga a dog
        this.state.posicionHgusano = this.state.posicionHgusano - 10;
      } else if(this.state.posicionHdog === this.state.posicionHgusano && this.state.posicionVdog === this.state.posicionVgusano){
        this.vidas();
      }
    }
  }


  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
    this.intervalGusano = setInterval(() => this.tickGusano(), 200);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.intervalGusano);
  }

  render() {   
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header-content">
            <table className='App-slogan'>
              <tbody>
                <tr>
                  <td><img id='logo' src={logo} className="App-logo" alt="logo" /></td>
                  <td><h2 className="App-tittle">Plaza de Frutas</h2></td>
                </tr>
              </tbody>
            </table>

            <h2 className='tiempo'><FontAwesomeIcon icon={faClock} /> {this.state.segundos}</h2>
            
            <table id='tablero'>
              <tbody>
                <tr>
                  <td><img className='vidas' src={logo} alt=" " />&nbsp;</td>
                  <td><h2>{this.state.vidas}</h2></td>
                  <td>&nbsp;&nbsp;&nbsp;</td>
                  <td><h2><FontAwesomeIcon icon={faLemon} />&nbsp;</h2></td>
                  <td><h2>{this.state.frutas}</h2></td>
                </tr>
              </tbody>
            </table> 
          </div>
        </header>
        <body className="App-body">
          <div className="App-body-content">
            <div id="cuadrilatero">
              <img id='bloquesHup1' src={bloquesH} className="App-bloquesH" alt="🧱" />
              <img id='bloquesHup2' src={bloquesH} className="App-bloquesH" alt="🧱" />
              <img id='bloquesHdown1' src={bloquesH} className="App-bloquesH" alt="🧱" />
              <img id='bloquesHdown2' src={bloquesH} className="App-bloquesH" alt="🧱" />
              <img id='bloquesVleft1' src={bloquesV} className="App-bloquesV" alt="🧱" />
              <img id='bloquesVleft2' src={bloquesV} className="App-bloquesV" alt="🧱" />
              <img id='bloquesVright1' src={bloquesV} className="App-bloquesV" alt="🧱"/>
              <img id='bloquesVright2' src={bloquesV} className="App-bloquesV" alt="🧱"/>
              <img id='dog' src={dog} className="App-dog" alt="🐶" style={{'marginTop': this.state.posicionVdog, 'marginLeft': this.state.posicionHdog}}/>
              <img id='gusano' src={gusano} className="App-dog" alt="🪱" style={{'marginTop': this.state.posicionVgusano, 'marginLeft': this.state.posicionHgusano}}/>
              <img id='manzana' src={manzana} className="App-fruta" alt="🍎" style={{'marginLeft': this.state.posicionHmanzana,'marginTop':this.state.posicionVmanzana}}/>
              <img id='banano' src={banano} className="App-fruta" alt="🍌" style={{'marginLeft': this.state.posicionHbanano,'marginTop':this.state.posicionVbanano}}/>
              <img id='mango' src={mango} className="App-fruta" alt="🥭" style={{'marginLeft': this.state.posicionHmango,'marginTop':this.state.posicionVmango}}/>
              <img id='fresa' src={fresa} className="App-fruta" alt="🍓" style={{'marginLeft': this.state.posicionHfresa,'marginTop':this.state.posicionVfresa}}/>
              <img id='bloque1' src={bloque} className="App-bloque" alt="🧱" style={{'marginTop': this.state.posicionVobstaculo1, 'marginLeft': this.state.posicionHobstaculo1}}/>
              <img id='bloque2' src={bloque} className="App-bloque" alt="🧱" style={{'marginTop': this.state.posicionVobstaculo2, 'marginLeft': this.state.posicionHobstaculo2}}/>
            </div>
            <div id='resultados'>
              <p>Hola <b>{this.state.nombre}</b>!</p>
              <p className='instructions'>{dogname} debe recolectar<br></br> todas las frutas antes <br></br>que Gusanor se lo coma</p>
              <input type="text" id="nombre" onChange={this.campoNombre} value={this.state.nombre} placeholder="nombre" autoComplete='off'/>
              <table id="flechas">
                <thead>
                  <tr>
                    <td colSpan={3}><button id="botonReset"  onMouseMove={this.botonReset} onClick={this.botonReset} className='botonReset'><FontAwesomeIcon icon={faRedoAlt} /></button></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={3}><button type='button' onMouseMove={this.botonUp} onClick={this.botonUp} className='botonFlechas' ><FontAwesomeIcon icon={faCaretUp} /></button></td>
                  </tr>
                  <tr>
                    <td><button type='button' onMouseMove={this.botonLeft} onClick={this.botonLeft} className='botonFlechas' ><FontAwesomeIcon icon={faCaretLeft} /></button></td>
                    <td><button type="button" onClick={this.botonStart} onKeyDown={this.flechasTeclado} className='botonStart' value="start" id="start"><FontAwesomeIcon icon={faPlayCircle} /></button></td>
                    <td><button type='button' onMouseMove={this.botonRight} onClick={this.botonRight} className='botonFlechas' ><FontAwesomeIcon icon={faCaretRight} /></button></td>
                  </tr>
                  <tr>
                    <td colSpan={3}><button type='button' onMouseMove={this.botonDown} onClick={this.botonDown} className='botonFlechas' ><FontAwesomeIcon icon={faCaretDown} /></button></td>
                  </tr>
                </tbody>
              </table>
              <img id='cajamadera' src={cajamadera} className="App-cajamadera" alt="cajamadera" />
              <h3>Ranking</h3>
              <ListaRanking items={this.state.items} tiempo={tiempo}/>
            </div>
          </div>
        </body>
      </div>
    );
  }

  getRandom() {
    let numero = (Math.random()*400) + 1;
    return numero
  }

  campoNombre(e) {
    this.setState({ nombre: e.target.value });
  }

  botonStart(e){                                          //Función para iniciar el juego
    e.preventDefault();
    this.state.estado = 'start';
    this.flechasTeclado();
  }                                                       //Funciones para sensar los botones                    
  botonUp(e) {                                            // Límite inferior movimiento Doggy dentro del cuadrilátero
    e.preventDefault();
    if(this.state.posicionVdog > -50){
      this.setState(state => ({ posicionVdog: this.state.posicionVdog - 10 }));
    }
  }
  botonDown(e) {
    e.preventDefault();
    if(this.state.posicionVdog < 590){                    // Límite inferior movimiento Doggy dentro del cuadrilátero
      this.setState(state => ({ posicionVdog: this.state.posicionVdog + 10 }));
    }
  }
  botonLeft(e) {                                          // Límite izquierda movimiento Doggy dentro del cuadrilátero
    e.preventDefault();
    if(this.state.posicionHdog > -450){
      this.setState(state => ({ posicionHdog: this.state.posicionHdog - 10 }));
    }
  }
  botonRight(e) {                                         // Límite derecha movimiento Doggy dentro del cuadrilátero
    e.preventDefault();
    if(this.state.posicionHdog < 370){
      this.setState(state => ({ posicionHdog: this.state.posicionHdog + 10 }));
    }
  }

  flechasTeclado(e) {                                     //Función para sensar las flechas del teclado
    e.preventDefault();
    if (e.keyCode === 38){ this.botonUp(e); }   
    if (e.keyCode === 40){ this.botonDown(e); }
    if (e.keyCode === 37){ this.botonLeft(e); }   
    if (e.keyCode === 39){ this.botonRight(e); }
    this.checkGanador();
    this.checkObstaculo();
  }

  checkGanador(posVFrutas) {
    const posH = 580;
    const posV = posVFrutas;
    console.log(posV);

    if((this.state.posicionHmanzana - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHmanzana + 40) &&
       (this.state.posicionVmanzana - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVmanzana + 40)
    ){
      this.state.frutas = this.state.frutas + 100; 
      this.state.posicionHmanzana = posH;
      this.state.posicionVmanzana = posV;
    }
    if((this.state.posicionHbanano - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHbanano + 40) &&
       (this.state.posicionVbanano - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVbanano + 40)
    ){
      this.state.frutas = this.state.frutas + 100; 
      this.state.posicionHbanano = posH + 50;
      this.state.posicionVbanano = posV;
    }
    if((this.state.posicionHmango - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHmango + 40) &&
       (this.state.posicionVmango - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVmango + 40)
    ){
      this.state.frutas = this.state.frutas + 100;
      this.state.posicionHmango = posH + 50;
      this.state.posicionVmango = posV;
    }
    if((this.state.posicionHfresa - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHfresa + 40) &&
       (this.state.posicionVfresa - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVfresa + 40)
    ){
      this.state.frutas = this.state.frutas + 100; 
      this.state.posicionHfresa = posH + 50;
      this.state.posicionVfresa = posV;
    }

    if(this.state.frutas === cantidadfrutas * 100){
      const newItem = {
        nombre: this.state.nombre,
        tiempo: this.state.segundos,
        puntos: this.state.frutas + 100
      };
      if(this.state.items.length < 10){
        this.setState(state => ({ items: state.items.concat(newItem) }));
      }
      swalert(
        <div>
          <img src={logo} alt="logo" style={{'height':'10vmin'}} />
          <h1>{dogname} está <FontAwesomeIcon icon={faSmile} /></h1>
          <p>Ganáste {this.state.nombre}! buen juego</p>
          <div >
              <h3>Ranking</h3>
              <ListaRanking items={this.state.items} tiempo={tiempo}/>
            </div>
        </div>
      )
      this.reset();
    }
  }

  checkObstaculo(e) {
    if((this.state.posicionHobstaculo - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHobstaculo + 40) &&
       (this.state.posicionVobstaculo - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVobstaculo + 40)
    ){
      alert('Obstaculo');
    }
  }

  vidas(){
    this.state.vidas = this.state.vidas - 1;
    this.state.segundos = tiempo;
    this.state.posicionHdog = dogH;
    this.state.posicionVdog = dogV;
    this.state.posicionHgusano = gusanoH;
    this.state.posicionVgusano = gusanoV;
    this.state.posicionHmanzana = manzanaH;
    this.state.posicionVmanzana = manzanaV; 
    this.state.posicionHbanano = bananoH; 
    this.state.posicionVbanano = bananoV; 
    this.state.posicionHmango = mangoH; 
    this.state.posicionVmango = mangoV; 
    this.state.posicionHfresa = fresaH; 
    this.state.posicionVfresa = fresaV;
    this.state.frutas = 0;
    this.state.estado = 'vidas';
    swalert(
      <div>
        <img src={logo} alt="logo" style={{'height':'10vmin'}} />
        <h1>{dogname} está <FontAwesomeIcon icon={faMeh} /></h1>
        <p>Lo siento {this.state.nombre}, intenta otra vez</p>
      </div>
    )
    this.setState(state => ({

    }));
  }

  botonReset(e) {
    e.preventDefault();
    this.reset();
  }
  reset(){
    this.state.segundos = tiempo;
    this.state.vidas = vidas;
    this.state.posicionHdog = dogH;
    this.state.posicionVdog = dogV;
    this.state.posicionHgusano = gusanoH;
    this.state.posicionVgusano = gusanoV;
    this.state.posicionHmanzana = manzanaH;
    this.state.posicionVmanzana = manzanaV; 
    this.state.posicionHbanano = bananoH; 
    this.state.posicionVbanano = bananoV; 
    this.state.posicionHmango = mangoH; 
    this.state.posicionVmango = mangoV; 
    this.state.posicionHfresa = fresaH; 
    this.state.posicionVfresa = fresaV;
    this.state.frutas = 0;
    this.state.estado = 'reset';
    this.state.nombre = '';

    this.setState(state => ({

    }));
  }
}



export default App;