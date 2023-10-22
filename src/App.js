import logo from './assets/logo.png';
import dog from './assets/dog.png';
import gusano from './assets/gusano.svg';
import manzana from './assets/manzana.svg';
import banano from './assets/banano.svg';
import mango from './assets/mango.svg';
import fresa from './assets/fresa.svg';
import bloque from './assets/bloque.svg';

import './App.css';

import React from 'react';
import { Cuadrilatero } from './components/cuadrilatero/Cuadrilatero';
import { ListaRanking } from './components/ranking/ListaRanking';

import { faCaretUp, faCaretDown, faCaretLeft, faCaretRight, faClock, faPlayCircle, faFrown, faRedoAlt, faSmile, faMeh, faLemon} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";     //Importa iconos fontawesome
import swalert from '@sweetalert/with-react';                         //Libreria alertas con diseño en JSX

const dogname = "Doggy";
const tiempo = 20;
const vidas = 3;
const cantidadfrutas = 4;
let cuadrilateroLimitsH,cuadrilateroLimitsV;                               
let dogH,dogV;
let gusanoH,gusanoV;
let manzanaH,manzanaV; 
let bananoH,bananoV; 
let mangoH,mangoV; 
let fresaH,fresaV;
let obstaculo1H,obstaculo1V;
let obstaculo2H,obstaculo2V;

// Orientación y tipo de dispositivo: Laptop | Tablet | Celular
const cellphoneSize = [380,720];                                     // Dimensiones ancho por alto de los dispositivos
const tabletSize = [720,1280];
let dispositive;
let dispositiveOrientation;
let windowWidth = document.documentElement.clientWidth;         // Tamaño horizontal de pantalla
let windowHeight = document.documentElement.clientHeight;       // Tamaño vertical de pantalla
const widthBlock =5;
let blockHeight = Math.floor(widthBlock * windowWidth/100);             // Ancho de los bloques del cuadrilatero, misma medida en el css de .obstaculo
let blockWidth = Math.floor(widthBlock *windowHeight/100);            // Ancho de los bloques del cuadrilatero, misma medida en el css de .obstaculo
let cantidadBloquesH = [];
let cantidadBloquesV = [];
for(let i=1; i<Math.floor(windowWidth/blockWidth); i++){       // Cantidad de bloques por pared horizontal del cuadrilatero
  cantidadBloquesH[i] = i;
}
for(let i=1; i<Math.floor(windowHeight/blockWidth); i++){      // Cantidad de bloques por pared vertical del cuadrilatero
  cantidadBloquesV[i] = i;
}
console.log("windowWidth: ", windowWidth)
console.log("windowHeight: ", windowHeight)
console.log("blockWidth: ", blockWidth)
console.log("cantidadBloquesH: ", cantidadBloquesH.length)
console.log("cantidadBloquesV: ", cantidadBloquesV.length)

if (windowWidth >= windowHeight) {          
    dispositiveOrientation = 'Landscape';                       // Orientación del dispositivo horizontal
    if (windowWidth <= cellphoneSize[1]) { dispositive = 'Cell' }    // Tipo de dispositivo Pc, Tablet o Celular
    else if (cellphoneSize[1] < windowWidth && windowWidth <= tabletSize[1]) { dispositive = 'Tablet' }
    else if (windowWidth > tabletSize[1]) { dispositive = 'Laptop' }
} else if ( windowHeight > windowWidth) { 
    dispositiveOrientation = 'Portrait';                        // Orientación del dispositivo vertical
    if (windowHeight <= cellphoneSize[1]) { dispositive = 'Cell' }   // Tipo de dispositivo Pc, Tablet o Celular
    else if (cellphoneSize[1] < windowHeight && windowHeight <= tabletSize[1]) { dispositive = 'Tablet' }
    else if (windowHeight > tabletSize[1]) { dispositive = 'Laptop' }
}
console.log(dispositive,dispositiveOrientation)

// Posicionamiento inicial de imagenes en el cuadrilatero
if(dispositiveOrientation === 'Portrait') {
    dogH = windowWidth/2 - windowWidth*50/100;
    dogV = windowHeight*70/100;
    gusanoH = windowWidth/2 - windowWidth*50/100;
    gusanoV = windowHeight*10/100;
    manzanaH = windowWidth/2 - windowWidth*11/100;
    manzanaV = windowHeight*38/100;
    bananoH = windowWidth/2 - windowWidth*8/100;
    bananoV = windowHeight*38/100;
    mangoH = windowWidth/2 + windowWidth*9/100;
    mangoV = windowHeight*38/100;
    fresaH = windowWidth/2 + windowWidth*13/100;
    fresaV = windowHeight*38/100;
    obstaculo1H = windowWidth/2 - windowWidth*40/100;
    obstaculo1V = windowHeight*40/100;
    obstaculo2H = windowWidth/2 - windowWidth*60/100;
    obstaculo2V = windowHeight*40/100;
} else if(dispositiveOrientation === 'Landscape') {
    dogH = windowWidth/2 - windowWidth*50/100;
    dogV = windowHeight*70/100;
    gusanoH = windowWidth/2 - windowWidth*50/100;
    gusanoV = windowHeight*10/100;
    manzanaH = windowWidth/2 - windowWidth*10/100;
    manzanaV = windowHeight*35/100;
    bananoH = windowWidth/2 - windowWidth*7/100;
    bananoV = windowHeight*35/100;
    mangoH = windowWidth/2 + windowWidth*10/100;
    mangoV = windowHeight*35/100;
    fresaH = windowWidth/2 + windowWidth*13/100;
    fresaV = windowHeight*35/100;
    obstaculo1H = windowWidth/2 - windowWidth*60/100;
    obstaculo1V = windowHeight*40/100;
    obstaculo2H = windowWidth/2 - windowWidth*40/100;
    obstaculo2V = windowHeight*40/100;
} 

// Alerta de bienvenida
// swalert(                                      
//   <div>
//     <h1>{dogname}</h1>
//     <img src={logo} alt="logo" style={{'height':'10vh'}} />
//     <p>Bienvenido</p>
//     {/* <input type="text" id="nombre" onChange={this.campoNombre} value={this.state.nombre} placeholder="nombre" autoComplete='off'/> */}
//     <p className='instructions'><b>{dogname}</b> debe recolectar<br></br> todas las frutas antes que<br></br>el malvado <b>Gusanor</b> lo atrape</p>
//     <h1> {dogname} está listo! <FontAwesomeIcon icon={faSmile} /></h1>
//     {/* <p>Vamos {nombre}, juega con todo!</p> */}
//   </div>
// )

// function App() {
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { segundos:tiempo, nombre:'', vidas:vidas, frutas:0, items: [], anchoVentana:windowWidth, posicionHdog:dogH, posicionVdog:dogV, posicionHgusano:gusanoH, posicionVgusano:gusanoV, posicionHmanzana:manzanaH, posicionVmanzana:manzanaV, posicionHbanano:bananoH, posicionVbanano:bananoV, posicionHmango:mangoH, posicionVmango:mangoV, posicionHfresa:fresaH, posicionVfresa:fresaV, posicionHobstaculo1:obstaculo1H, posicionVobstaculo1:obstaculo1V, posicionHobstaculo2:obstaculo2H, posicionVobstaculo2:obstaculo2V, estado:'', displayManzana:'block', displayBanano:'block', displayMango:'block', displayFresa:'block'  };
    this.campoNombre = this.campoNombre.bind(this);         // Funciones
    this.botonStart = this.botonStart.bind(this);
    this.flechasTeclado = this.flechasTeclado.bind(this);
    this.botonUp = this.botonUp.bind(this);
    this.botonDown = this.botonDown.bind(this);
    this.botonLeft = this.botonLeft.bind(this);
    this.botonRight = this.botonRight.bind(this);
    this.botonReset = this.botonReset.bind(this);
  }

  /********************* THICKS (Métodos repetitivos) *********************/
  // tickGetDispositive() {
  //   window.addEventListener("orientationchange", ()=> {
  //     this.setCuadrilatero();
  //     this.setPositionXY();
  //   }); 
  // }

  tick() {
    window.addEventListener("orientationchange", ()=> {   // Detecta si hay cambio de orientacion
      this.setCuadrilatero();
      this.setPositionXY();
    }); 

    if(this.state.estado === 'start'){     // Se activa cuando se presiona el boton start
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
          <img src={logo} alt="logo" style={{'height':'10vh'}} />
          <h1> {dogname} está <FontAwesomeIcon icon={faFrown} /></h1>
          <p>Vamos {this.state.nombre}, juega de nuevo!</p>
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
          posicionVgusano: this.state.posicionVgusano + 10,
        }));
      } else if(this.state.posicionHdog > this.state.posicionHgusano && this.state.posicionVdog < this.state.posicionVgusano){           
        this.setState(state => ({
          posicionHgusano: this.state.posicionHgusano + 10,
          posicionVgusano: this.state.posicionVgusano - 10,
        }));
      } else if(this.state.posicionHdog === this.state.posicionHgusano && this.state.posicionVdog > this.state.posicionVgusano){     
        this.setState(state => ({  
          posicionVgusano: this.state.posicionVgusano + 10,
        }));
      } else if(this.state.posicionHdog === this.state.posicionHgusano && this.state.posicionVdog < this.state.posicionVgusano){  
        this.setState(state => ({
          posicionVgusano: this.state.posicionVgusano - 10,
        }));
      } else if(this.state.posicionHdog < this.state.posicionHgusano && this.state.posicionVdog > this.state.posicionVgusano){
        this.setState(state => ({
          posicionHgusano: this.state.posicionHgusano - 10,
          posicionVgusano: this.state.posicionVgusano + 10,
        }));
      } else if(this.state.posicionHdog < this.state.posicionHgusano && this.state.posicionVdog < this.state.posicionVgusano){
        this.setState(state => ({
          posicionHgusano: this.state.posicionHgusano - 10,
          posicionVgusano: this.state.posicionVgusano - 10,
        }));
      } else if(this.state.posicionHdog > this.state.posicionHgusano && this.state.posicionVdog === this.state.posicionVgusano){           //Hace que el Gusano persiga a dog
        this.setState(state => ({
          posicionHgusano: this.state.posicionHgusano + 10,
        }));
      } else if(this.state.posicionHdog < this.state.posicionHgusano && this.state.posicionVdog === this.state.posicionVgusano){           //Hace que el Gusano persiga a dog
        this.setState(state => ({
          posicionHgusano: this.state.posicionHgusano - 10,
        }));
      } else if(this.state.posicionHdog === this.state.posicionHgusano && this.state.posicionVdog === this.state.posicionVgusano){
          this.vidas();

      }
    }
  }

  /*********** THICKS CONTROL (Maneja intervalos de tiempo de las thicks ************/
  componentDidMount() {
    // this.intervalOrientation = setInterval(() => this.tickGetDispositive(), 1000);
    // this.intervalPosXY = setInterval(() => this.setPositionXY(), 1000);
    // this.intervalCuadrilatero = setInterval(() => this.setCuadrilatero(), 1000);
    this.interval = setInterval(() => this.tick(), 1000);
    this.intervalGusano = setInterval(() => this.tickGusano(), 200);
  }
  componentWillUnmount() {
    // clearInterval(this.intervalOrientation);
    // clearInterval(this.intervalPosXY);
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
            <table className='tablaTablero'>
              <tbody>
                <tr>
                  <td><img className='vidas' src={logo} alt="🐶" />&nbsp;</td>
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
              <Cuadrilatero id={"cuadrilateroUp"} orientation={"horizontal"} cantidadBloquesH={cantidadBloquesH} cantidadBloquesV={cantidadBloquesV} blockWidth={blockWidth}/>
              <Cuadrilatero id={"cuadrilateroLeft"} orientation={"vertical"} cantidadBloquesH={cantidadBloquesH} cantidadBloquesV={cantidadBloquesV} blockWidth={blockWidth}/>
              <Cuadrilatero id={"cuadrilateroRight"} orientation={"vertical"} cantidadBloquesH={cantidadBloquesH} cantidadBloquesV={cantidadBloquesV} blockWidth={blockWidth} />
              <Cuadrilatero id={"cuadrilateroDown"} orientation={"horizontal"} cantidadBloquesH={cantidadBloquesH} cantidadBloquesV={cantidadBloquesV} blockWidth={blockWidth} />
              <img id='dog' src={dog} className="dog" alt="🐶" style={{'marginTop': this.state.posicionVdog, 'marginLeft': this.state.posicionHdog}}/>
              <img id='gusano' src={gusano} className="gusano" alt="🪱" style={{'marginTop': this.state.posicionVgusano, 'marginLeft': this.state.posicionHgusano}}/>
              <img id='manzana' src={manzana} className="fruta" alt="🍎" style={{'marginLeft': this.state.posicionHmanzana,'marginTop':this.state.posicionVmanzana,'display':this.state.displayManzana}}/>
              <img id='banano' src={banano} className="fruta" alt="🍌" style={{'marginLeft': this.state.posicionHbanano,'marginTop':this.state.posicionVbanano,'display':this.state.displayBanano}}/>
              <img id='mango' src={mango} className="fruta" alt="🥭" style={{'marginLeft': this.state.posicionHmango,'marginTop':this.state.posicionVmango,'display':this.state.displayMango}}/>
              <img id='fresa' src={fresa} className="fruta" alt="🍓" style={{'marginLeft': this.state.posicionHfresa,'marginTop':this.state.posicionVfresa,'display':this.state.displayFresa}}/>
              <img id='obstaculo1' src={bloque} className="obstaculo" alt="🧱" style={{'marginTop': this.state.posicionVobstaculo1, 'marginLeft': this.state.posicionHobstaculo1}}/>
              <img id='obstaculo2' src={bloque} className="obstaculo" alt="🧱" style={{'marginTop': this.state.posicionVobstaculo2, 'marginLeft': this.state.posicionHobstaculo2}}/>    
            </div>
            <div id='controles'>
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
          </div>
        </body>
      </div>
    );
  }

  
  /********************* HELPERS (Funciones llamadas desde la interfaz gráfica *********************/
  getRandom() {
    let numero = Math.round(Math.random()*100);
    return numero
  }

  campoNombre(e) {
    this.setState({ nombre: e.target.value });
  }

  botonStart(e){                                          //Función para iniciar el juego
    e.preventDefault();
    this.setState(state => ({ estado: 'start' }));
    this.flechasTeclado();
    console.log("cellphoneSize: ",cellphoneSize)
    this.setCuadrilatero();
    this.setPositionXY();
    this.setState(state => ({
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
  }));

    const offset = this.getRandom();
    console.log("offset: ",offset);
  }                                                       //Funciones para sensar los botones                    
  
  botonUp(e) {                                            // Límite inferior movimiento Doggy dentro del cuadrilátero
    e.preventDefault();
    if(this.state.posicionVdog > cuadrilateroLimitsV[0]){
      this.setState(state => ({ posicionVdog: this.state.posicionVdog - 10 }));
    }
  }
  botonDown(e) {                                          // Límite inferior movimiento Doggy dentro del cuadrilátero
    e.preventDefault();
    if(this.state.posicionVdog < cuadrilateroLimitsV[1]){                    
      this.setState(state => ({ posicionVdog: this.state.posicionVdog + 10 }));
    }
  }
  botonLeft(e) {                                          // Límite izquierda movimiento Doggy dentro del cuadrilátero
    e.preventDefault();
    if(this.state.posicionHdog > cuadrilateroLimitsH[0]){
      this.setState(state => ({ posicionHdog: this.state.posicionHdog - 10 }));
    }
  }
  botonRight(e) {                                         // Límite derecha movimiento Doggy dentro del cuadrilátero
    e.preventDefault();
    if(this.state.posicionHdog < cuadrilateroLimitsH[1]){
      this.setState(state => ({ posicionHdog: this.state.posicionHdog + 10 }));
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
    }
  }

  setCuadrilatero() {
    console.log("setCuadrilatero INICIO" );
    console.log("cellphoneSize: ", cellphoneSize );
    windowWidth = document.documentElement.clientWidth;       // Tamaño horizontal de pantalla
    windowHeight = document.documentElement.clientHeight;     // Tamaño vertical de pantalla
    console.log("windowWidth setCuadrilatero(): ", windowWidth );
    console.log("windowHeight setCuadrilatero(): ", windowHeight );
    if (windowWidth > windowHeight) {          
        dispositiveOrientation = 'Landscape';                          // Orientación del dispositivo horizontal
        if (windowWidth <= cellphoneSize[1]) { dispositive = 'Cell' }  // Tipo de dispositivo Pc, Tablet o Celular
        else if (cellphoneSize[1] < windowWidth && windowWidth <= tabletSize[1]) { dispositive = 'Tablet' }
        else if (windowWidth > tabletSize[1]) { dispositive = 'Laptop' }
    } else if ( windowHeight > windowWidth) { 
        dispositiveOrientation = 'Portrait';                           // Orientación del dispositivo vertical
        if (windowHeight <= cellphoneSize[1]) { dispositive = 'Cell' } // Tipo de dispositivo Pc, Tablet o Celular
        else if (cellphoneSize[1] < windowHeight && windowHeight <= tabletSize[1]) { dispositive = 'Tablet' }
        else if (windowHeight > tabletSize[1]) { dispositive = 'Laptop' }
    }
    console.log("dispositive,dispositiveOrientation: ",dispositive,dispositiveOrientation );

    // blockWidth = Math.floor(widthBlockCss * windowWidth/100);        // Ancho de los bloques del cuadrilatero, misma medida en el css de .obstaculo
    blockHeight = Math.floor(widthBlock * windowWidth/100);            // Ancho de los bloques del cuadrilatero, misma medida en el css de .obstaculo
    blockWidth = Math.floor(widthBlock * windowHeight/100);          // Ancho de los bloques del cuadrilatero, misma medida en el css de .obstaculo
    for(let i=1; i<Math.floor(windowWidth/blockWidth); i++){   // Cantidad de bloques por pared horizontal del cuadrilatero
      cantidadBloquesH[i] = i;
    }
    for(let i=1; i<Math.floor(windowHeight/blockWidth); i++){  // Cantidad de bloques por pared vertical del cuadrilatero
      cantidadBloquesV[i] = i;
    }
    console.log("windowWidth: ", windowWidth)
    console.log("windowHeight: ", windowHeight)
    console.log("blockWidth: ", blockWidth)
    console.log("cantidadBloquesH: ", cantidadBloquesH.length)
    console.log("cantidadBloquesV: ", cantidadBloquesV.length)
    console.log("setCuadrilatero FIN" );
  }

  setPositionXY() {
    console.log("setPositionXY INICIO" );
    const limitLeft = document.getElementById('cuadrilatero').offsetLeft;  // Limites de movimiento dentro del cuadrilatero
    const limitRight = document.getElementById('cuadrilatero').offsetWidth;
    const limitUp = document.getElementById('cuadrilatero').offsetTop;
    const limitDown = document.getElementById('cuadrilatero').offsetHeight;   
    const limitWidth = document.getElementById('cuadrilatero').offsetWidth;   
    const limitHeigth = document.getElementById('cuadrilatero').offsetHeight; 
    const offsetH = document.getElementById('cuadrilateroLeft').offsetWidth;
    const offsetV = document.getElementById('cuadrilateroDown').offsetHeight;

    console.log("limitLeft setPositionXY(): ",limitLeft)
    console.log("limitRight setPositionXY(): ",limitRight)
    console.log("limitUp setPositionXY(): ",limitUp)
    console.log("limitDown setPositionXY(): ",limitDown)
    console.log("limitWidth setPositionXY(): ",limitWidth)
    console.log("limitHeigth setPositionXY(): ",limitHeigth)
    console.log("offsetH setPositionXY(): ",offsetH)
    console.log("offsetV setPositionXY(): ",offsetV)

    // Orientación Portrait para Celular | Tablet | Laptop
    if(dispositive === 'Cell' && dispositiveOrientation === 'Portrait') {
        // cuadrilateroLimitsH = [limitLeft + limitWidth, limitRight - limitWidth]; // Límite horizontal bordes cuadrilatero
        cuadrilateroLimitsH = [limitLeft, limitRight - limitWidth]; // Límite horizontal bordes cuadrilatero
        cuadrilateroLimitsV = [limitUp, limitDown - limitWidth];            // Límite vertical bordes cuadrilatero
        dogH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        dogH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        dogV = cuadrilateroLimitsV[1];
        gusanoH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        gusanoV = 0;
        manzanaH = cuadrilateroLimitsH[1] - 10;
        manzanaV = cuadrilateroLimitsV[0] + 20;
        bananoH = cuadrilateroLimitsH[0] + 20; 
        bananoV = cuadrilateroLimitsV[0] + 20;
        mangoH = cuadrilateroLimitsH[1] - 10;
        mangoV = cuadrilateroLimitsV[1];
        fresaH = cuadrilateroLimitsH[0] + 20; 
        fresaV = cuadrilateroLimitsV[1];
        obstaculo1H = cuadrilateroLimitsH[1] - 110;
        obstaculo1V = cuadrilateroLimitsV[0] + 100;
        obstaculo2H = cuadrilateroLimitsH[0] + 60; 
        obstaculo2V = cuadrilateroLimitsV[1] - 80;
    } else if(dispositive === 'Tablet' && dispositiveOrientation === 'Portrait') {
        cuadrilateroLimitsH = [limitLeft + limitWidth, limitRight - limitWidth];   // Límite horizontal bordes cuadrilatero
        cuadrilateroLimitsV = [limitUp, limitDown - limitWidth];            // Límite vertical bordes cuadrilatero
        dogH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        dogV = cuadrilateroLimitsV[1];
        gusanoH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        gusanoV = 0;
        manzanaH = cuadrilateroLimitsH[1];
        manzanaV = cuadrilateroLimitsV[0] + 40;
        bananoH = cuadrilateroLimitsH[0] + 30; 
        bananoV = cuadrilateroLimitsV[0] + 40;
        mangoH = cuadrilateroLimitsH[1];
        mangoV = cuadrilateroLimitsV[1];
        fresaH = cuadrilateroLimitsH[0] + 30; 
        fresaV = cuadrilateroLimitsV[1];
        obstaculo1H = cuadrilateroLimitsH[1] - 110;
        obstaculo1V = cuadrilateroLimitsV[0] + 100;
        obstaculo2H = cuadrilateroLimitsH[0] + 60; 
        obstaculo2V = cuadrilateroLimitsV[1] - 80;
    } else if(dispositive === 'Laptop' && dispositiveOrientation === 'Portrait') {
        cuadrilateroLimitsH = [limitLeft + limitWidth, limitRight - limitWidth];   // Límite horizontal bordes cuadrilatero
        cuadrilateroLimitsV = [limitUp, limitDown - limitWidth];            // Límite vertical bordes cuadrilatero
        dogH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        dogV = cuadrilateroLimitsV[1];
        gusanoH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        gusanoV = 0;
        manzanaH = cuadrilateroLimitsH[1] + 10;
        manzanaV = cuadrilateroLimitsV[0] + 50;
        bananoH = cuadrilateroLimitsH[0] + 30; 
        bananoV = cuadrilateroLimitsV[0] + 50;
        mangoH = cuadrilateroLimitsH[1] + 10;
        mangoV = cuadrilateroLimitsV[1] + 10;
        fresaH = cuadrilateroLimitsH[0] + 30; 
        fresaV = cuadrilateroLimitsV[1] + 10;
        obstaculo1H = cuadrilateroLimitsH[1] - 110;
        obstaculo1V = cuadrilateroLimitsV[0] + 100;
        obstaculo2H = cuadrilateroLimitsH[0] + 60; 
        obstaculo2V = cuadrilateroLimitsV[1] - 80;

    // Orientación Landscape para Celular | Tablet | Laptop
    } else if(dispositive === 'Cell' && dispositiveOrientation === 'Landscape') {
        cuadrilateroLimitsH = [-limitRight/2 + offsetH/2, limitRight/2 - offsetH];   // Límite horizontal bordes cuadrilatero
        cuadrilateroLimitsV = [limitUp - offsetV/2, limitDown - 3/2*offsetV];            // Límite vertical bordes cuadrilatero
        // const offset = this.getRandom();
        // console.log("offset: ", offset)
        
        dogH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        dogV = cuadrilateroLimitsV[1];
        gusanoH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        gusanoV = 0;
        manzanaH = limitRight - offsetH;
        manzanaV = limitUp + offsetV/2;
        bananoH = limitRight - (limitRight - offsetH);
        bananoV = limitUp + offsetV/2;
        mangoH = limitRight - offsetH; 
        mangoV = limitHeigth - 3/2 * offsetV;
        fresaH = limitRight - (limitRight - offsetH); 
        fresaV = limitHeigth - 3/2 * offsetV;
        obstaculo1H = cuadrilateroLimitsH[1] - 110;
        obstaculo1V = cuadrilateroLimitsV[0] + 100;
        obstaculo2H = cuadrilateroLimitsH[0] + 60; 
        obstaculo2V = cuadrilateroLimitsV[1] - 80;
    } else if(dispositive === 'Tablet' && dispositiveOrientation === 'Landscape') {
        cuadrilateroLimitsH = [-limitRight/2 + offsetH/2, limitRight/2 - offsetH];   // Límite horizontal bordes cuadrilatero
        cuadrilateroLimitsV = [limitUp, limitDown - offsetH];            // Límite vertical bordes cuadrilatero        dogH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        dogV = cuadrilateroLimitsV[1];
        gusanoH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        gusanoV = 0;
        manzanaH = limitRight - offsetH; 
        manzanaV = limitUp + offsetV/2;
        bananoH = limitRight - (limitRight - offsetH);
        bananoV = limitUp + offsetV/2;
        mangoH = limitRight - offsetH; 
        mangoV = limitHeigth - 3/2 * offsetV;
        fresaH = limitRight - (limitRight - offsetH); 
        fresaV = limitHeigth - 3/2 * offsetV;
        obstaculo1H = cuadrilateroLimitsH[1] - 160;
        obstaculo1V = cuadrilateroLimitsV[0] + 170;
        obstaculo2H = cuadrilateroLimitsH[0] + 190; 
        obstaculo2V = cuadrilateroLimitsV[1] - 180;
     } 
      else if(dispositive === 'Laptop' && dispositiveOrientation === 'Landscape') {
        cuadrilateroLimitsH = [-limitRight/2 + offsetH/2, limitRight/2 - offsetH];   // Límite horizontal bordes cuadrilatero
        cuadrilateroLimitsV = [limitUp, limitDown - offsetH];            // Límite vertical bordes cuadrilatero        dogH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        dogV = cuadrilateroLimitsV[1];
        gusanoH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        gusanoV = 0; 
        manzanaH = limitRight - offsetH; 
        manzanaV = limitUp + offsetV/2;
        bananoH = limitRight - (limitRight - offsetH);
        bananoV = limitUp + offsetV/2;
        mangoH = limitRight - offsetH; 
        mangoV = limitHeigth - 3/2 * offsetV;
        fresaH = limitRight - (limitRight - offsetH); 
        fresaV = limitHeigth - 3/2 * offsetV;
        obstaculo1H = 130; 
        obstaculo1V = 135;
        obstaculo2H = obstaculo1H - 330; 
        obstaculo2V = obstaculo1V + 260;
    }
    this.setState(state => ({
        anchoVentana:windowWidth,
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
    }));
    console.log("setPositionXY FIN" );
  }

  checkGanador() {                                       // Funcon para revision del estado del juego
    if((this.state.posicionHmanzana - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHmanzana + 40) &&
       (this.state.posicionVmanzana - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVmanzana + 40)
    ){
      this.setState(state => ({
          frutas: this.state.frutas + 100,
          displayManzana:'none',
          posicionHmanzana: document.getElementById('cuadrilateroUp').offsetLeft,
          posicionVmanzana: document.getElementById('cuadrilateroUp').offsetTop,
      }));
    }
    if((this.state.posicionHbanano - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHbanano + 40) &&
       (this.state.posicionVbanano - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVbanano + 40)
    ){
      this.setState(state => ({
        frutas: this.state.frutas + 100,
        displayBanano:'none',
        posicionHbanano: document.getElementById('cuadrilateroUp').offsetLeft,
        posicionVbanano: document.getElementById('cuadrilateroUp').offsetTop,
      }));
    }
    if((this.state.posicionHmango - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHmango + 40) &&
       (this.state.posicionVmango - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVmango + 40)
    ){
      this.setState(state => ({
        frutas: this.state.frutas + 100,
        displayMango:'none',
        posicionHmango: document.getElementById('cuadrilateroUp').offsetLeft,
        posicionVmango: document.getElementById('cuadrilateroUp').offsetTop,
      }));
    }
    if((this.state.posicionHfresa - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHfresa + 40) &&
       (this.state.posicionVfresa - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVfresa + 40)
    ){
      this.setState(state => ({
        frutas: this.state.frutas + 100,
        displayFresa:'none',
        posicionHfresa: document.getElementById('cuadrilateroUp').offsetLeft,
        posicionVfresa: document.getElementById('cuadrilateroUp').offsetTop,
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
      swalert(
        <div>
          <img src={logo} alt="logo" style={{'height':'10vh'}} />
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
    swalert(
      <div>
        <img src={logo} alt="logo" style={{'height':'10vh'}} />
        <h1>{dogname} está <FontAwesomeIcon icon={faMeh} /></h1>
        <p>Lo siento, intentalo otra vez!</p>
      </div>
    )
    this.setState(state => ({
        vidas: vidas - 1,
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
        displayManzana:'block',
        displayBanano:'block', 
        displayMango:'block', 
        displayFresa:'block',
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
        displayManzana:'block',
        displayBanano:'block', 
        displayMango:'block', 
        displayFresa:'block',
        nombre: '',
    }));
  }
}


export default App;