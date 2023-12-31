import logo from './assets/images/logo.png';
import dog from './assets/images/dog.png';
import gusano from './assets/images/gusano.svg';
import manzana from './assets/images/manzana.svg';
import banano from './assets/images/banano.svg';
import mango from './assets/images/mango.svg';
import fresa from './assets/images/fresa.svg';
import bloque from './assets/images/bloque.svg';

import introMp3 from './assets/sounds/intro.mp3';
import coinMp3 from './assets/sounds/coin.mp3';
import roundOneMp3 from './assets/sounds/roundOne.mp3';
import roundTwoMp3 from './assets/sounds/roundTwo.mp3';
import roundThreeMp3 from './assets/sounds/roundThree.mp3';
import youWinMp3 from './assets/sounds/youWin.mp3';
import countdownMp3 from './assets/sounds/countdown.mp3';
import gameOverMp3 from './assets/sounds/gameOver.mp3';
import fineMp3 from './assets/sounds/fine.mp3';
import wonderfulMp3 from './assets/sounds/wonderful.mp3';
import mammaMiaMp3 from './assets/sounds/mammaMia.mp3';
import yeahLaughMp3 from './assets/sounds/yeahLaugh.mp3';
import oohMp3 from './assets/sounds/ooh.mp3'
import loserMp3 from './assets/sounds/loser.mp3'

import './App.css';

import React from 'react';
import { ListaRanking } from './components/ranking/ListaRanking';
import { DogName } from './components/dogname/DogName';

import { faCaretUp, faCaretDown, faCaretLeft, faCaretRight, faClock, faPlayCircle, faFrown, faRedoAlt, faSmile, faMeh, faLemon} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";     //Importa iconos fontawesome
import swalert from '@sweetalert/with-react';                         //Libreria alertas con diseño en JSX

const dogname = "doggy";
const tiempo = 20;
const vidas = 3;
const cantidadfrutas = 4;
const audioIntro = new Audio(introMp3);
const audioCoin = new Audio(coinMp3);
const audioRoundOne = new Audio(roundOneMp3);
const audioRoundTwo = new Audio(roundTwoMp3);
const audioRoundThree = new Audio(roundThreeMp3);
const audioYouWin = new Audio(youWinMp3);
const audioFine = new Audio(fineMp3);
const audioWonderful = new Audio(wonderfulMp3);
const audioMammaMia = new Audio(mammaMiaMp3);
const audioGameOver = new Audio(gameOverMp3);
const audioCountdown = new Audio(countdownMp3);
const audioOoh = new Audio(oohMp3);
const audioLoser = new Audio(loserMp3);
const audioYeahLaugh = new Audio(yeahLaughMp3);
const soundIntro = () => { audioIntro.play(); };
const soundCoin = () => { audioCoin.play(); };
const soundRoundOne = () => { audioRoundOne.play(); };
const soundRoundTwo = () => { audioRoundTwo.play(); };
const soundRoundThree = () => { audioRoundThree.play(); };
const soundYouWin = () => { audioYouWin.play(); };
const soundFine= () => { audioFine.play(); };
const soundWonderful = () => { audioWonderful.play(); };
const soundMammaMia = () => { audioMammaMia.play(); };
const soundGameOver = () => { audioGameOver.play(); };
const soundCountdown = () => { audioCountdown.play(); };
const soundOoh = () => { audioOoh.play(); };
const soundLoser = () => { audioLoser.play(); };
const soundYeahLaugh = () => { audioYeahLaugh.play(); };

// Orientación y tipo de dispositivo: Laptop | Tablet | Celular
const cellphoneSize = [380,720];                              // Dimensiones ancho por alto de los dispositivos
const tabletSize = [720,1280];
let device;
let deviceOrientation = window.screen.orientation.type;       // Orientaciób del dispositivo Landscape o Portrait
let deviceWidth = document.documentElement.clientWidth;       // Tamaño horizontal de pantalla
let deviceHeight = document.documentElement.clientHeight;     // Tamaño vertical de pantalla
if (deviceWidth >= deviceHeight) {
  if (deviceWidth <= cellphoneSize[1]) { device = 'cellphone' } // Tipo de dispositivo Pc, Tablet o Celular
  else if (cellphoneSize[1] < deviceWidth && deviceWidth <= tabletSize[1]) { device = 'tablet' }
  else if (deviceWidth > tabletSize[1]) { device = 'laptop' }
} else if ( deviceHeight > deviceWidth) {
  if (deviceHeight <= cellphoneSize[1]) { device = 'cellphone' } // Tipo de dispositivo Pc, Tablet o Celular
  else if (cellphoneSize[1] < deviceHeight && deviceHeight <= tabletSize[1]) { device = 'tablet' }
  else if (deviceHeight > tabletSize[1]) { device = 'laptop' }
}
console.log("Device type: ",device)
console.log("Device orientation: ", deviceOrientation)
console.log("Device Width:", deviceWidth, " Height:", deviceHeight)

let dogH = 0;                                 // Figuras con posicionamiento inicial
let dogV = Math.floor(deviceHeight*75/100);
let gusanoH = 0;
let gusanoV = deviceHeight*5/100;
let manzanaH = deviceWidth*15/100;
let manzanaV = dogV/2;
let bananoH = -deviceWidth*35/100;
let bananoV = dogV/2;
let mangoH = deviceWidth*35/100;
let mangoV = dogV/2;
let fresaH = -deviceWidth*15/100;
let fresaV = dogV/2;
let obstaculo1H = deviceWidth*-20/100;
let obstaculo1V = deviceHeight*50/100;
let obstaculo2H = deviceWidth*20/100;
let obstaculo2V = deviceHeight*50/100;
let cuadrilateroLimitsH;
let cuadrilateroLimitsV;
console.log("dogV inicial: ",dogV)

// Alerta de bienvenida
swalert(
  <div>
      <div className='swal-title'>
        <h1><DogName/></h1>
      </div>
      <div>
        <img className='swal-logo' src={logo} alt='🐶' />
        {/* <input type="text" id="nombre" onChange={this.campoNombre} value={this.state.nombre} placeholder="nombre" autoComplete='off'/> */}
        <p><b>Doggy</b> debe recolectar todas las frutas antes que el malvado <b>Gusanor</b> lo atrape</p>
        <h2 className='swal-subtitle'> <DogName/> está listo! <FontAwesomeIcon icon={faSmile} /></h2>
        {/* <p>Vamos {nombre}, juega con todo!</p> */}
      </div>
    </div>
)



// function App() {
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      segundos:tiempo,
      nombre:dogname,
      vidas:vidas,
      frutas:0,
      items: [],
      anchoVentana:deviceWidth,
      altoVentana:deviceHeight,
      posicionHdog:dogH,
      posicionVdog:dogV,
      posicionHgusano:gusanoH,
      posicionVgusano:gusanoV,
      posicionHmanzana:manzanaH,
      posicionVmanzana:manzanaV,
      posicionHbanano:bananoH,
      posicionVbanano:bananoV,
      posicionHmango:mangoH,
      posicionVmango:mangoV,
      posicionHfresa:fresaH,
      posicionVfresa:fresaV,
      posicionHobstaculo1:obstaculo1H,
      posicionVobstaculo1:obstaculo1V,
      posicionHobstaculo2:obstaculo2H,
      posicionVobstaculo2:obstaculo2V,
      estado:'',
      displayManzana:'inline',
      displayBanano:'inline',
      displayMango:'inline',
      displayFresa:'inline'
    };
    this.campoNombre = this.campoNombre.bind(this);         // Mapeo de botones con sus funciones
    this.botonStart = this.botonStart.bind(this);
    this.flechasTeclado = this.flechasTeclado.bind(this);
    this.botonUp = this.botonUp.bind(this);
    this.botonDown = this.botonDown.bind(this);
    this.botonLeft = this.botonLeft.bind(this);
    this.botonRight = this.botonRight.bind(this);
    this.botonReset = this.botonReset.bind(this);
  }

  /********************* THICKS (Métodos repetitivos) *********************/
  // tickGetDevice() {

  // }

  tick() {
    if(this.state.estado === 'start'){     // Se activa cuando se presiona el boton start
      this.setState(state => ({
        segundos: state.segundos - 1,
        nombre: this.state.nombre
      }));
    }
    if(this.state.segundos === 0 && this.state.frutas < cantidadfrutas * 100 && this.state.vidas > 0){     //Calcula tiempo, cantidad de frutas y si tiene vidas el jugador
        this.vidas();
    } else if(this.state.vidas === 0){     //Calcula tiempo, cantidad de frutas y si tiene vidas el jugador
      soundGameOver();
      swalert(
        <div>
          <img className='swal-logo' src={logo} alt='🐶' />
          <h2 className='swal-subtitle'> <DogName/> está <FontAwesomeIcon icon={faFrown} /></h2>
          <p>Vamos <b>{this.state.nombre}</b>, juega de nuevo!</p>
        </div>
      )
      this.reset();
    }
  }

  tickGusano() {                            // Manejo de Gusanor
    if(this.state.estado === 'start'){
      if(this.state.posicionHdog > this.state.posicionHgusano && this.state.posicionVdog > this.state.posicionVgusano){           //Hace que el Gusano persiga a dog
        this.setState(state => ({
          posicionHgusano: this.state.posicionHgusano + 10,
          posicionVgusano: this.state.posicionVgusano + 10
        }));
      } else if(this.state.posicionHdog > this.state.posicionHgusano && this.state.posicionVdog < this.state.posicionVgusano){
        this.setState(state => ({
          posicionHgusano: this.state.posicionHgusano + 10,
          posicionVgusano: this.state.posicionVgusano - 10
        }));
      } else if(this.state.posicionHdog === this.state.posicionHgusano && this.state.posicionVdog > this.state.posicionVgusano){
        this.setState(state => ({
          posicionVgusano: this.state.posicionVgusano + 10
        }));
      } else if(this.state.posicionHdog === this.state.posicionHgusano && this.state.posicionVdog < this.state.posicionVgusano){
        this.setState(state => ({
          posicionVgusano: this.state.posicionVgusano - 10
        }));
      } else if(this.state.posicionHdog < this.state.posicionHgusano && this.state.posicionVdog > this.state.posicionVgusano){
        this.setState(state => ({
          posicionHgusano: this.state.posicionHgusano - 10,
          posicionVgusano: this.state.posicionVgusano + 10
        }));
      } else if(this.state.posicionHdog < this.state.posicionHgusano && this.state.posicionVdog < this.state.posicionVgusano){
        this.setState(state => ({
          posicionHgusano: this.state.posicionHgusano - 10,
          posicionVgusano: this.state.posicionVgusano - 10
        }));
      } else if(this.state.posicionHdog > this.state.posicionHgusano && this.state.posicionVdog === this.state.posicionVgusano){           //Hace que el Gusano persiga a dog
        this.setState(state => ({
          posicionHgusano: this.state.posicionHgusano + 10
        }));
      } else if(this.state.posicionHdog < this.state.posicionHgusano && this.state.posicionVdog === this.state.posicionVgusano){           //Hace que el Gusano persiga a dog
        this.setState(state => ({
          posicionHgusano: this.state.posicionHgusano - 10
        }));
      } else if(this.state.posicionHdog === this.state.posicionHgusano && this.state.posicionVdog === this.state.posicionVgusano){
          this.vidas();

      }
    }
  }

  /*********** THICKS CONTROL (Maneja intervalos de tiempo de las thicks ************/
  componentDidMount() {
    // this.intervalOrientation = setInterval(() => this.tickGetDevice(), 500);
    this.interval = setInterval(() => this.tick(), 1000);
    this.intervalGusano = setInterval(() => this.tickGusano(), 200);
  }
  componentWillUnmount() {
    // clearInterval(this.intervalOrientation);
    clearInterval(this.interval);
    clearInterval(this.intervalGusano);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <table className='App-slogan'>
              <tbody>
                <tr>
                  <td><img id='logo' src={logo} className="App-logo" alt="logo" />&nbsp;</td>
                  <td><p className="App-title">Plaza de Frutas</p></td>
                </tr>
              </tbody>
            </table>
            <table className='tablaTablero'>
              <tbody>
                <tr>
                  <td><img className='vidas' src={logo} alt="🐶" />&nbsp;</td>
                  <td>{this.state.vidas}</td>
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td><FontAwesomeIcon icon={faLemon} />&nbsp;</td>
                  <td>{this.state.frutas}</td>
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td><FontAwesomeIcon icon={faClock} />&nbsp;</td>
                  <td><p> {this.state.segundos}</p></td>
                </tr>
              </tbody>
            </table>
        </header>
        <body className="App-body">
            <div id="cuadrilatero" className="cuadrilatero">
              <img id='dog' src={dog} className="dog" alt="🐶" style={{'marginTop': this.state.posicionVdog, 'marginLeft': this.state.posicionHdog}}/>
              <img id='gusano' src={gusano} className="gusano" alt="🪱" style={{'marginTop': this.state.posicionVgusano, 'marginLeft': this.state.posicionHgusano}}/>
              <img id='manzana' src={manzana} className="fruta" alt="🍎" style={{'marginLeft': this.state.posicionHmanzana,'marginTop':this.state.posicionVmanzana,'display':this.state.displayManzana}}/>
              <img id='banano' src={banano} className="fruta" alt="🍌" style={{'marginLeft': this.state.posicionHbanano,'marginTop':this.state.posicionVbanano,'display':this.state.displayBanano}}/>
              <img id='mango' src={mango} className="fruta" alt="🥭" style={{'marginLeft': this.state.posicionHmango,'marginTop':this.state.posicionVmango,'display':this.state.displayMango}}/>
              <img id='fresa' src={fresa} className="fruta" alt="🍓" style={{'marginLeft': this.state.posicionHfresa,'marginTop':this.state.posicionVfresa,'display':this.state.displayFresa}}/>
              <img id='obstaculo1' src={bloque} className="obstaculo" alt="🧱" style={{'marginTop': this.state.posicionVobstaculo1, 'marginLeft': this.state.posicionHobstaculo1}}/>
              <img id='obstaculo2' src={bloque} className="obstaculo" alt="🧱" style={{'marginTop': this.state.posicionVobstaculo2, 'marginLeft': this.state.posicionHobstaculo2}}/>
            </div>
            <div id='controles' className="controles">
              <table className="tablaFlechas">
                {/* <thead>
                  <tr>
                    <td colSpan={3}><button id="botonReset"  onMouseMove={this.botonReset} onClick={this.botonReset} className='botonReset'><FontAwesomeIcon icon={faRedoAlt} /></button></td>
                  </tr>
                </thead> */}
                <tbody>
                  <tr>
                    <td colSpan={3}><button type='button' id="botonUp" title="botonUp" onMouseMove={this.botonUp} onClick={this.botonUp} className='botonFlechas' ><FontAwesomeIcon icon={faCaretUp} /></button></td>
                  </tr>
                  <tr>
                    <td><button type='button' id="botonLeft" title="botonLeft" onMouseMove={this.botonLeft} onClick={this.botonLeft} className='botonFlechas' ><FontAwesomeIcon icon={faCaretLeft} /></button></td>
                    <td><button type="button" id="start" title="start" onClick={this.botonStart} onKeyDown={this.flechasTeclado} className='botonStart' value="start"><FontAwesomeIcon icon={faPlayCircle} /></button></td>
                    <td><button type='button' id="botonRight" title="botonRight" onMouseMove={this.botonRight} onClick={this.botonRight} className='botonFlechas' ><FontAwesomeIcon icon={faCaretRight} /></button></td>
                  </tr>
                  <tr>
                    <td colSpan={3}><button type='button' id="botonDown" title="botonDown"  onMouseMove={this.botonDown} onClick={this.botonDown} className='botonFlechas' ><FontAwesomeIcon icon={faCaretDown} /></button></td>
                  </tr>
                </tbody>
              </table>
              {/* <h3>Ranking</h3>
              <ListaRanking items={this.state.items} tiempo={tiempo}/> */}
          </div>
        </body>
      </div>
    );
  }


  /********************* HELPERS (Funciones llamadas desde la interfaz gráfica *********************/
  getRandom(max=10) {
    let numero = Math.floor((Math.random()*max)/10)*10;
    return numero
  }

  campoNombre(e) {
    this.setState({ nombre: e.target.value });
  }

  botonStart(e){                                          //Función para iniciar el juego
    e.preventDefault();
    console.log("botonStart START" );
    this.setState(state => ({ estado: 'start' }));
    this.flechasTeclado();
    console.log("Cellphone dimensions: ",cellphoneSize)
    this.getOrientation();
    this.setPositionXY();
    console.log("botonStart FIN" );
    if(this.state.vidas === 3){ soundRoundOne(); }
    else if(this.state.vidas === 2){ soundRoundTwo(); }
    else if(this.state.vidas === 1){ soundRoundThree(); }
  }                                                       //Funciones para sensar los botones

  botonUp(e) {                                            // Límite inferior movimiento Doggy dentro del cuadrilátero
    e.preventDefault();
    if(this.state.posicionVdog > cuadrilateroLimitsV[0]){
      this.setState(state => ({ posicionVdog: this.state.posicionVdog - 10 }));
    }
    if(this.state.estado === 'start'){
      this.checkGanador();
      this.checkObstaculo();
    }
  }
  botonDown(e) {                                          // Límite inferior movimiento Doggy dentro del cuadrilátero
    e.preventDefault();
    if(this.state.posicionVdog < cuadrilateroLimitsV[1]){
      this.setState(state => ({ posicionVdog: this.state.posicionVdog + 10 }));
    }
    if(this.state.estado === 'start'){
      this.checkGanador();
      this.checkObstaculo();
    }
  }
  botonLeft(e) {                                          // Límite izquierda movimiento Doggy dentro del cuadrilátero
    e.preventDefault();
    if(this.state.posicionHdog > cuadrilateroLimitsH[0]){
      this.setState(state => ({ posicionHdog: this.state.posicionHdog - 10 }));
    }
    if(this.state.estado === 'start'){
      this.checkGanador();
      this.checkObstaculo();
    }
  }
  botonRight(e) {                                         // Límite derecha movimiento Doggy dentro del cuadrilátero
    e.preventDefault();
    if(this.state.posicionHdog < cuadrilateroLimitsH[1]){
      this.setState(state => ({ posicionHdog: this.state.posicionHdog + 10 }));
    }
    if(this.state.estado === 'start'){
      this.checkGanador();
      this.checkObstaculo();
    }
  }

  flechasTeclado(e) {                                     //Función para sensar las flechas del teclado
    if (e){
      e.preventDefault();
      if (e.keyCode === 38){ this.botonUp(e); }
      if (e.keyCode === 40){ this.botonDown(e); }
      if (e.keyCode === 37){ this.botonLeft(e); }
      if (e.keyCode === 39){ this.botonRight(e); }
      this.checkGanador();
      this.checkObstaculo();
      console.log("posicionHdog,posicionVdog: ",this.state.posicionHdog,this.state.posicionVdog)
      console.log("posicionHgusano,posicionVgusano: ",this.state.posicionHgusano,this.state.posicionVgusano)
      console.log("posicionHmanzana,posicionVmanzana: ",this.state.posicionHmanzana,this.state.posicionVmanzana)
      console.log("posicionHbanano,posicionVbanano: ",this.state.posicionHbanano,this.state.posicionVbanano)
      console.log("posicionHmango,posicionVmango: ",this.state.posicionHmango,this.state.posicionVmango)
      console.log("posicionHfresa,posicionVfresa: ",this.state.posicionHfresa,this.state.posicionVfresa)
    }

  }

  getOrientation() {
    console.log("getOrientation INICIO" );
    deviceWidth = document.documentElement.clientWidth;       // Tamaño horizontal de pantalla
    deviceHeight = document.documentElement.clientHeight;     // Tamaño vertical de pantalla
    deviceOrientation = window.screen.orientation.type;       // Tamaño vertical de pantalla
    this.setState(state => ({
      anchoVentana:deviceWidth,
      altoVentana:deviceHeight
    }));
    // console.log("this.state.anchoVentana getOrientation(): ", this.state.anchoVentana);
    // console.log("Device Width,Height: ", deviceWidth,deviceHeight);
    // console.log("Device Orientation getOrientation(): ", deviceOrientation);
    console.log("getOrientation FIN" );

  }

  setPositionXY() {
    console.log("setPositionXY INICIO" );
    // Definicionn de posiciones de imagenes dentro de limites del cuadrilatero
    const limitWidth = Math.floor(document.getElementById('cuadrilatero').offsetWidth/10) * 10;   // Redondeo de unidades a la decena inferior mas cercana
    const limitHeigth = Math.floor(document.getElementById('cuadrilatero').offsetHeight/10) * 10;
    cuadrilateroLimitsH = [Math.round((-(limitWidth/2)*95/100)/10)*10, Math.round(((limitWidth/2)*95/100)/10)*10];   // Límite horizontal bordes cuadrilatero
    cuadrilateroLimitsV = [0, Math.floor((limitHeigth*90/100)/10)*10];  // Límite vertical bordes cuadrilatero
    dogH = 0;
    dogV = Math.floor(cuadrilateroLimitsV[1]/10)*10;
    gusanoH = 0;
    gusanoV = 0;
    manzanaH = this.getRandom(cuadrilateroLimitsH[1]);
    manzanaV = this.getRandom(cuadrilateroLimitsV[1]);
    bananoH = this.getRandom(cuadrilateroLimitsH[1]);
    bananoV = this.getRandom(cuadrilateroLimitsV[1]);
    mangoH = this.getRandom(cuadrilateroLimitsH[1]);
    mangoV = this.getRandom(cuadrilateroLimitsV[1]);
    fresaH = this.getRandom(cuadrilateroLimitsH[1]);
    fresaV = this.getRandom(cuadrilateroLimitsV[1]);
    obstaculo1H = this.getRandom(cuadrilateroLimitsH[1]);
    obstaculo1V = this.getRandom(cuadrilateroLimitsV[1]);
    obstaculo2H = this.getRandom(cuadrilateroLimitsH[0]);
    obstaculo2V = this.getRandom(cuadrilateroLimitsV[1]);
    console.log("Ancho cuadrilatero: ",limitWidth)
    console.log("Alto cuadrilatero: ",limitHeigth)
    console.log("Limites H cuadrilatero: ",cuadrilateroLimitsH)
    console.log("Limites V cuadrilatero: ",cuadrilateroLimitsV)
    console.log("dogH,dogV: ",dogH,dogV);
    console.log("gusanoH,gusanoV: ",gusanoH,gusanoV);
    console.log("manzanaH, manzanaV: ",manzanaH, manzanaV);
    console.log("bananoH, bananoV: ",bananoH, bananoV );
    console.log("mangoH, mangoV: ",mangoH, mangoV );
    console.log("fresaH, fresaV: ",fresaH, fresaV );
    console.log("obstaculo1H, obstaculo1V: ",obstaculo1H, obstaculo1V );
    console.log("obstaculo2H, obstaculo2V: ",obstaculo2H, obstaculo2V );
    this.setState(state => ({
        anchoVentana:deviceWidth,
        altoVentana:deviceHeight,
        posicionHdog: dogH,
        posicionVdog: dogV,
        posicionHgusano: gusanoH,
        posicionVgusano: gusanoV,
        posicionHmanzana: manzanaH,
        posicionVmanzana: manzanaV,
        posicionHbanano: bananoH,
        posicionVbanano: bananoV,
        posicionHmango: mangoH,
        posicionVmango: mangoV,
        posicionHfresa: fresaH,
        posicionVfresa: fresaV,
        posicionHobstaculo1: obstaculo1H,
        posicionVobstaculo1: obstaculo1V,
        posicionHobstaculo2: obstaculo2H,
        posicionVobstaculo2: obstaculo2V
    }));
    console.log("setPositionXY FIN" );
  }

  checkGanador() {                                       // Funcon para revision del estado del juego
    if((this.state.posicionHmanzana - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHmanzana + 40) &&
       (this.state.posicionVmanzana - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVmanzana + 40)
    ){
      soundCoin();
      if(this.state.frutas === 0){ soundFine() }
      else if(this.state.frutas === 100){ soundWonderful() }
      else if(this.state.frutas === 200){ soundMammaMia() }
      this.setState(state => ({
          frutas: this.state.frutas + 100,
          displayManzana:'none',
          posicionHmanzana: document.getElementById('cuadrilatero').offsetLeft,
          posicionVmanzana: document.getElementById('cuadrilatero').offsetTop
      }));
    }
    if((this.state.posicionHbanano - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHbanano + 40) &&
       (this.state.posicionVbanano - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVbanano + 40)
    ){
      soundCoin();
      if(this.state.frutas === 0){ soundFine() }
      else if(this.state.frutas === 100){ soundWonderful() }
      else if(this.state.frutas === 200){ soundMammaMia() }
      this.setState(state => ({
        frutas: this.state.frutas + 100,
        displayBanano:'none',
        posicionHbanano: document.getElementById('cuadrilatero').offsetLeft,
        posicionVbanano: document.getElementById('cuadrilatero').offsetTop
      }));
    }
    if((this.state.posicionHmango - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHmango + 40) &&
       (this.state.posicionVmango - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVmango + 40)
    ){
      soundCoin();
      if(this.state.frutas === 0){ soundFine() }
      else if(this.state.frutas === 100){ soundWonderful() }
      else if(this.state.frutas === 200){ soundMammaMia() }
      this.setState(state => ({
        frutas: this.state.frutas + 100,
        displayMango:'none',
        posicionHmango: document.getElementById('cuadrilatero').offsetLeft,
        posicionVmango: document.getElementById('cuadrilatero').offsetTop
      }));
    }
    if((this.state.posicionHfresa - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHfresa + 40) &&
       (this.state.posicionVfresa - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVfresa + 40)
    ){
      soundCoin();
      if(this.state.frutas === 0){ soundFine() }
      else if(this.state.frutas === 100){ soundWonderful() }
      else if(this.state.frutas === 200){ soundMammaMia() }
      this.setState(state => ({
        frutas: this.state.frutas + 100,
        displayFresa:'none',
        posicionHfresa: document.getElementById('cuadrilatero').offsetLeft,
        posicionVfresa: document.getElementById('cuadrilatero').offsetTop
      }));
    }

    if(this.state.frutas === cantidadfrutas * 100){               // Genera el listado del Ranking
      const newItem = {
        // nombre: this.state.nombre,
        nombre: dogname,
        tiempo: this.state.segundos,
        puntos: this.state.frutas + 100
      };
      if(this.state.items.length < 10){
        this.setState(state => ({ items: state.items.concat(newItem) }));
      }
      soundYouWin();
      soundYeahLaugh();
      swalert(
        <div>
          <img className='swal-logo' src={logo} alt='🐶' />
          <h2 className='swal-subtitle'><DogName/> está <FontAwesomeIcon icon={faSmile} /></h2>
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
    soundOoh();
    soundLoser();
    swalert(
      <div>
        <img className='swal-logo' src={logo} alt='🐶' />
        <h2 className='swal-subtitle'><DogName/> está <FontAwesomeIcon icon={faMeh} /></h2>
        <p>Lo siento, intentalo otra vez!</p>
      </div>
    )
    this.setState(state => ({
        vidas: state.vidas - 1,
        segundos: tiempo,
        posicionHdog: dogH,
        posicionVdog: dogV,
        posicionHgusano: gusanoH,
        posicionVgusano: gusanoV,
        posicionHmanzana: manzanaH,
        posicionVmanzana: manzanaV,
        posicionHbanano: bananoH,
        posicionVbanano: bananoV,
        posicionHmango: mangoH,
        posicionVmango: mangoV,
        posicionHfresa: fresaH,
        posicionVfresa: fresaV,
        frutas : 0,
        estado : 'vidas',
        displayManzana:'inline',
        displayBanano:'inline',
        displayMango:'inline',
        displayFresa:'inline'
    }));
  }

  botonReset(e) {
    e.preventDefault();
    this.reset();
  }
  reset(){
    this.setState(state => ({
        segundos: tiempo,
        vidas: vidas,
        posicionHdog: dogH,
        posicionVdog: dogV,
        posicionHgusano: gusanoH,
        posicionVgusano: gusanoV,
        posicionHmanzana: manzanaH,
        posicionVmanzana: manzanaV,
        posicionHbanano: bananoH,
        posicionVbanano: bananoV,
        posicionHmango: mangoH,
        posicionVmango: mangoV,
        posicionHfresa: fresaH,
        posicionVfresa: fresaV,
        frutas: 0,
        estado: 'reset',
        displayManzana:'inline',
        displayBanano:'inline',
        displayMango:'inline',
        displayFresa:'inline',
        nombre: ''
    }));
  }
}


export default App;