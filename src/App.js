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

import { faCaretUp, faCaretDown, faCaretLeft, faCaretRight, faClock, faPlayCircle, faFrown, faRedoAlt, faSmile, faMeh, faLemon} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";     //Importa iconos fontawesome
import swalert from '@sweetalert/with-react';                         //Libreria alertas con diseño en JSX

const dogname = "Doggy";
const tiempo = 20;
const vidas = 3;
const cantidadfrutas = 4;
const dogH = -50;
const dogV = 530; 
const gusanoH = -50;
const gusanoV = 0; 
const manzanaH = 300;
const manzanaV = 40; 
const bananoH = -350; 
const bananoV = 40; 
const mangoH = 300; 
const mangoV = 510; 
const fresaH = -350; 
const fresaV = 510;
const obstaculoH = 100; 
const obstaculoV = 100;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { segundos:tiempo, nombre:'', vidas:vidas, frutas:0, items: [], posicionHdog:dogH, posicionVdog:dogV, posicionHgusano:gusanoH, posicionVgusano:gusanoV, posicionHmanzana:manzanaH, posicionVmanzana:manzanaV, posicionHbanano:bananoH, posicionVbanano:bananoV, posicionHmango:mangoH, posicionVmango:mangoV, posicionHfresa:fresaH, posicionVfresa:fresaV,  posicionHobstaculo:obstaculoH, posicionVobstaculo:obstaculoV, estado:''  };
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
          <img src={logo} alt="logo" style={{'height':'20vmin'}} />
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
          <div id='registro'>
              <p className='instructions'>{dogname} debe recolectar<br></br> todas las frutas antes <br></br>que Gusanor se lo coma</p>
              <p>Hola <b>{this.state.nombre}</b>!</p>
              <input type="text" id="nombre" onChange={this.campoNombre} value={this.state.nombre} placeholder="nombre" autoComplete='off'/>
              <h3>Ranking</h3>
              <ListaRanking items={this.state.items}/>
            </div>

            <div id="cuadrilatero">
              <img id='bloquesHup1' src={bloquesH} className="App-bloquesH" alt="bloquesH" style={{'marginTop': -50, 'marginLeft': 0}}/>
              <img id='bloquesHup2' src={bloquesH} className="App-bloquesH" alt="bloquesH" style={{'marginTop': -50, 'marginLeft': -490}}/>
              <img id='bloquesHdown1' src={bloquesH} className="App-bloquesH" alt="bloquesH" style={{'marginTop': 600, 'marginLeft': 0}}/>
              <img id='bloquesHdown2' src={bloquesH} className="App-bloquesH" alt="bloquesH" style={{'marginTop': 600, 'marginLeft': -490}}/>
              <img id='bloquesVleft1' src={bloquesV} className="App-bloquesV" alt="bloquesV" style={{'marginTop': -2, 'marginLeft': -488}}/>
              <img id='bloquesVleft2' src={bloquesV} className="App-bloquesV" alt="bloquesV" style={{'marginTop': 298, 'marginLeft': 401}}/>
              <img id='bloquesVright1' src={bloquesV} className="App-bloquesV" alt="bloquesV" style={{'marginTop': -2, 'marginLeft': 401}}/>
              <img id='bloquesVright2' src={bloquesV} className="App-bloquesV" alt="bloquesV" style={{'marginTop': 298, 'marginLeft': -488}}/>
              <img id='bloque1' src={bloque} className="App-bloque" alt="bloque" style={{'marginTop': this.state.posicionVobstaculo, 'marginLeft': this.state.posicionHobstaculo}}/>
              <img id='dog' src={dog} className="App-dog" alt={dogname} style={{'marginTop': this.state.posicionVdog, 'marginLeft': this.state.posicionHdog}}/>
              <img id='gusano' src={gusano} className="App-dog" alt="gusano" style={{'marginTop': this.state.posicionVgusano, 'marginLeft': this.state.posicionHgusano}}/>
              <img id='manzana' src={manzana} className="App-fruta" alt="manzana" style={{'marginLeft': this.state.posicionHmanzana,'marginTop':this.state.posicionVmanzana}}/>
              <img id='banano' src={banano} className="App-fruta" alt="banano" style={{'marginLeft': this.state.posicionHbanano,'marginTop':this.state.posicionVbanano}}/>
              <img id='mango' src={mango} className="App-fruta" alt="mango" style={{'marginLeft': this.state.posicionHmango,'marginTop':this.state.posicionVmango}}/>
              <img id='fresa' src={fresa} className="App-fruta" alt="fresa" style={{'marginLeft': this.state.posicionHfresa,'marginTop':this.state.posicionVfresa}}/>
              <img id='bloque2' src={bloque} className="App-bloque" alt="bloque" style={{'marginTop': this.state.posicionVobstaculo + 200, 'marginLeft': this.state.posicionHobstaculo - 300}}/>
            </div>
            <div id='resultados'>
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
    this.setState({ 
      nombre: e.target.value
     });
  }

  botonStart(e){                                 //Función para iniciar el juego
    e.preventDefault();
    this.state.estado = 'start';
    this.flechasTeclado();
  }
  botonUp(e) {                                    //Funciones para sensar los botones
    e.preventDefault();
    if(this.state.posicionVdog > -50){
      this.setState(state => ({
        posicionVdog: this.state.posicionVdog - 10
      }));
    }
  }
  botonDown(e) {
    e.preventDefault();
    if(this.state.posicionVdog < 530){
      this.setState(state => ({
        posicionVdog: this.state.posicionVdog + 10
      }));
    }
  }
  botonLeft(e) {
    e.preventDefault();
    if(this.state.posicionHdog > -420){
      this.setState(state => ({
        posicionHdog: this.state.posicionHdog - 10
      }));
    }
  }
  botonRight(e) {
    e.preventDefault();
    if(this.state.posicionHdog < 350){
      this.setState(state => ({
        posicionHdog: this.state.posicionHdog + 10
      }));
    }
  }

  flechasTeclado(e) {                                  //Función para sensar las flechas del teclado
    e.preventDefault();
    if (e.keyCode === 38){
      this.botonUp(e);
    }   
    if (e.keyCode === 40){
      this.botonDown(e);
    }
    if (e.keyCode === 37){
      this.botonLeft(e);
    }   
    if (e.keyCode === 39){
      this.botonRight(e);
    }
    this.checkGanador();
    this.checkObstaculo();
  }

  checkGanador(e) {
    if((this.state.posicionHmanzana - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHmanzana + 40) &&
       (this.state.posicionVmanzana - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVmanzana + 40)
    ){
      this.state.frutas = this.state.frutas + 100; 
      this.state.posicionHmanzana = 580;
      this.state.posicionVmanzana = 340;
    }
    if((this.state.posicionHbanano - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHbanano + 40) &&
       (this.state.posicionVbanano - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVbanano + 40)
    ){
      this.state.frutas = this.state.frutas + 100; 
      this.state.posicionHbanano = 630;
      this.state.posicionVbanano = 340;
    }
    if((this.state.posicionHmango - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHmango + 40) &&
       (this.state.posicionVmango - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVmango + 40)
    ){
      this.state.frutas = this.state.frutas + 100;
      this.state.posicionHmango = 680;
      this.state.posicionVmango = 340;
    }
    if((this.state.posicionHfresa - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHfresa + 40) &&
       (this.state.posicionVfresa - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVfresa + 40)
    ){
      this.state.frutas = this.state.frutas + 100; 
      this.state.posicionHfresa = 730;
      this.state.posicionVfresa = 340;
    }

    if(this.state.frutas === cantidadfrutas * 100){
      const newItem = {
        nombre: this.state.nombre,
        tiempo: this.state.segundos,
        puntos: this.state.frutas + 100
      };
      if(this.state.items.length < 10){
        this.setState(state => ({
          items: state.items.concat(newItem)
        }));
      }
      swalert(
        <div>
          <img src={logo} alt="logo" style={{'height':'20vmin'}} />
          <h1>{dogname} está <FontAwesomeIcon icon={faSmile} /></h1>
          <p>Ganáste {this.state.nombre}! buen juego</p>
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


class ListaRanking extends React.Component {
  render() {
    return (
      <ol>
        {this.props.items.map(item => (
          <li>{item.nombre} {tiempo-item.tiempo} seg {item.puntos} ptos</li>
        ))}
      </ol>
    );
  }
}



export default App;
