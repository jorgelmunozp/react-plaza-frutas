import logo from './assets/logo.png';
import dog from './assets/dog.png';
import gusano from './assets/gusano.svg';
import manzana from './assets/manzana.svg';
import banano from './assets/banano.svg';
import mango from './assets/mango.svg';
import fresa from './assets/fresa.svg';
import cajamadera from './assets/cajamadera.svg';
import bloque from './assets/bloque.svg';
import bloquesH from './assets/bloquesH.png';
import bloquesV from './assets/bloquesV.png';

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

let cuadrilateroLimitsH,cuadrilateroLimitsV;                               
let dogH,dogV;
let gusanoH,gusanoV;
let manzanaH,manzanaV; 
let bananoH,bananoV; 
let mangoH,mangoV; 
let fresaH,fresaV;
let obstaculo1H,obstaculo1V;
let obstaculo2H,obstaculo2V;
let posVFrutas;
let posCajaMadera;

// Orientación y tipo de dispositivo: Laptop | Tablet | Celular
let dispositive;
let dispositiveOrientation;
const cellSize = [380,720];                                   // Dimensiones ancho por alto de los dispositivos
const tabletSize = [720,1280];
let windowWidth;       // Tamaño horizontal de pantalla
let windowHeight;     // Tamaño vertical de pantalla

// let windowWidth = document.documentElement.clientWidth;       // Tamaño horizontal de pantalla
// let windowHeight = document.documentElement.clientHeight;     // Tamaño vertical de pantalla
// if (windowWidth > windowHeight) {          
//     dispositiveOrientation = 'Landscape';                          // Orientación del dispositivo horizontal
//     if (windowWidth <= cellSize[1]) { dispositive = 'Cell' }       // Tipo de dispositivo Pc, Tablet o Celular
//     else if (cellSize[1] < windowWidth && windowWidth <= tabletSize[1]) { dispositive = 'Tablet' }
//     else if (windowWidth > tabletSize[1]) { dispositive = 'Laptop' }
// } else if ( windowHeight > windowWidth) { 
//     dispositiveOrientation = 'Portrait';                           // Orientación del dispositivo vertical
//     if (windowHeight <= cellSize[1]) { dispositive = 'Cell' }      // Tipo de dispositivo Pc, Tablet o Celular
//     else if (cellSize[1] < windowHeight && windowHeight <= tabletSize[1]) { dispositive = 'Tablet' }
//     else if (windowHeight > tabletSize[1]) { dispositive = 'Laptop' }
// }

// if(dispositive == 'Cell' && dispositiveOrientation == 'Portrait') {
//     dogH = -10; dogV = 150;
//     gusanoH = -7.5; gusanoV = 0;
//     manzanaH = 90; manzanaV = 5;
//     bananoH = -100; bananoV = 5;
//     mangoH = 90; mangoV = 150;
//     fresaH = -100; fresaV = 150;
//     obstaculo1H = 40; obstaculo1V = 40;
//     obstaculo2H = obstaculo1H - 100; obstaculo2V = obstaculo1V + 55;
// } else if(dispositive == 'Cell' && dispositiveOrientation == 'Landscape') {
//     cuadrilateroLimitsH = [-210,170];           // Límite horizontal bordes cuadrlátero
//     cuadrilateroLimitsV = [-30,260];            // Límite vertical bordes cuadrlátero
//     dogH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
//     dogV = cuadrilateroLimitsV[1];
//     gusanoH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
//     gusanoV = 0;
//     manzanaH = cuadrilateroLimitsH[1] - 20;
//     manzanaV = cuadrilateroLimitsV[0] + 50;
//     bananoH = cuadrilateroLimitsH[0] + 40; 
//     bananoV = cuadrilateroLimitsV[0] + 50;
//     mangoH = cuadrilateroLimitsH[1] - 20;
//     mangoV = cuadrilateroLimitsV[1];
//     fresaH = cuadrilateroLimitsH[0] + 40; 
//     fresaV = cuadrilateroLimitsV[1];
//     obstaculo1H = cuadrilateroLimitsH[1] - 110;
//     obstaculo1V = cuadrilateroLimitsV[0] + 100;
//     obstaculo2H = cuadrilateroLimitsH[0] + 110; 
//     obstaculo2V = cuadrilateroLimitsV[1] - 80;
// } else if(dispositive == 'Tablet' && dispositiveOrientation == 'Landscape') {
//     cuadrilateroLimitsH = [-380,310];           // Límite horizontal bordes cuadrlátero
//     cuadrilateroLimitsV = [-60,490];            // Límite vertical bordes cuadrlátero
//     dogH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
//     dogV = cuadrilateroLimitsV[1];
//     gusanoH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
//     gusanoV = 0;
//     manzanaH = cuadrilateroLimitsH[1] - 10;
//     manzanaV = cuadrilateroLimitsV[0] + 80;
//     bananoH = cuadrilateroLimitsH[0] + 50; 
//     bananoV = cuadrilateroLimitsV[0] + 80;
//     mangoH = cuadrilateroLimitsH[1] - 10;
//     mangoV = cuadrilateroLimitsV[1];
//     fresaH = cuadrilateroLimitsH[0] + 50; 
//     fresaV = cuadrilateroLimitsV[1];
//     obstaculo1H = cuadrilateroLimitsH[1] - 160;
//     obstaculo1V = cuadrilateroLimitsV[0] + 170;
//     obstaculo2H = cuadrilateroLimitsH[0] + 190; 
//     obstaculo2V = cuadrilateroLimitsV[1] - 180;
//  } 
//   else if(dispositive == 'Laptop' && dispositiveOrientation == 'Landscape') {
//     // cuadrilateroLimitsH
//     console.log("Laptop")
//     const limitLeft = document.getElementById('bloquesVleft1').getBoundingClientRect();
//     const limitRight = document.getElementById('bloquesVright1').getBoundingClientRect();
//     const limitUp = document.getElementById('bloquesHup1').getBoundingClientRect();
//     const limitDown = document.getElementById('bloquesHdown1').getBoundingClientRect();
//     // Math.round((posCajaMadera.top + posCajaMadera.bottom)/2);

//     console.log("limitLeft: " + limitLeft.left + " limitRight: " + limitRight.right );
//     console.log("limitUp: " + limitUp.top + " limitRight: " + limitDown.bottom );

//     cuadrilateroLimitsH = [-450,370];           // Límite horizontal bordes cuadrlátero
//     cuadrilateroLimitsV = [-70,590];            // Límite vertical bordes cuadrlátero
//     dogH = -45;
//     dogV = 590;
//     gusanoH = -30;
//     gusanoV = 0; 
//     manzanaH = 340;
//     manzanaV = 40;
//     bananoH = -380; 
//     bananoV = 40;
//     mangoH = 340; 
//     mangoV = 570;
//     fresaH = -380; 
//     fresaV = 570;
//     obstaculo1H = 130; 
//     obstaculo1V = 135;
//     obstaculo2H = obstaculo1H - 330; 
//     obstaculo2V = obstaculo1V + 260;
// }


// function App() {
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { segundos:tiempo, nombre:'', vidas:vidas, frutas:0, items: [], posicionHdog:dogH, posicionVdog:dogV, posicionHgusano:gusanoH, posicionVgusano:gusanoV, posicionHmanzana:manzanaH, posicionVmanzana:manzanaV, posicionHbanano:bananoH, posicionVbanano:bananoV, posicionHmango:mangoH, posicionVmango:mangoV, posicionHfresa:fresaH, posicionVfresa:fresaV, posicionHobstaculo1:obstaculo1H, posicionVobstaculo1:obstaculo1V, posicionHobstaculo2:obstaculo2H, posicionVobstaculo2:obstaculo2V, estado:''  };
    this.campoNombre = this.campoNombre.bind(this);
    this.botonStart = this.botonStart.bind(this);
    this.flechasTeclado = this.flechasTeclado.bind(this);
    this.botonUp = this.botonUp.bind(this);
    this.botonDown = this.botonDown.bind(this);
    this.botonLeft = this.botonLeft.bind(this);
    this.botonRight = this.botonRight.bind(this);
    this.botonReset = this.botonReset.bind(this);
  }

  tickDispositive() {
    window.addEventListener("orientationchange", ()=> {
      windowWidth = document.documentElement.clientWidth;       // Tamaño horizontal de pantalla
      windowHeight = document.documentElement.clientHeight;     // Tamaño vertical de pantalla
      if(windowWidth > windowHeight) { dispositiveOrientation ='Landscape';}      // Orientación del dispositivo horizontal         
      else if(windowHeight > windowWidth) { dispositiveOrientation ='Portrait';}  // Orientación vertical del dispositivo 
      else if(windowHeight == windowWidth) { dispositiveOrientation ='Landscape';}// Orientación vertical del dispositivo 
      console.log("dispositiveOrientation: " + dispositiveOrientation)
    }); 
  }

  setPositionXY() {
    let windowWidth = document.documentElement.clientWidth;       // Tamaño horizontal de pantalla
    let windowHeight = document.documentElement.clientHeight;     // Tamaño vertical de pantalla
    if (windowWidth > windowHeight) {          
        dispositiveOrientation = 'Landscape';                          // Orientación del dispositivo horizontal
        if (windowWidth <= cellSize[1]) { dispositive = 'Cell' }       // Tipo de dispositivo Pc, Tablet o Celular
        else if (cellSize[1] < windowWidth && windowWidth <= tabletSize[1]) { dispositive = 'Tablet' }
        else if (windowWidth > tabletSize[1]) { dispositive = 'Laptop' }
    } else if ( windowHeight > windowWidth) { 
        dispositiveOrientation = 'Portrait';                           // Orientación del dispositivo vertical
        if (windowHeight <= cellSize[1]) { dispositive = 'Cell' }      // Tipo de dispositivo Pc, Tablet o Celular
        else if (cellSize[1] < windowHeight && windowHeight <= tabletSize[1]) { dispositive = 'Tablet' }
        else if (windowHeight > tabletSize[1]) { dispositive = 'Laptop' }
    }
    
    if(dispositive == 'Cell' && dispositiveOrientation == 'Portrait') {
        dogH = -10; dogV = 150;
        gusanoH = -7.5; gusanoV = 0;
        manzanaH = 90; manzanaV = 5;
        bananoH = -100; bananoV = 5;
        mangoH = 90; mangoV = 150;
        fresaH = -100; fresaV = 150;
        obstaculo1H = 40; obstaculo1V = 40;
        obstaculo2H = obstaculo1H - 100; obstaculo2V = obstaculo1V + 55;
    } else if(dispositive == 'Cell' && dispositiveOrientation == 'Landscape') {
        cuadrilateroLimitsH = [-210,170];           // Límite horizontal bordes cuadrlátero
        cuadrilateroLimitsV = [-30,260];            // Límite vertical bordes cuadrlátero
        dogH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        dogV = cuadrilateroLimitsV[1];
        gusanoH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        gusanoV = 0;
        manzanaH = cuadrilateroLimitsH[1] - 20;
        manzanaV = cuadrilateroLimitsV[0] + 50;
        bananoH = cuadrilateroLimitsH[0] + 40; 
        bananoV = cuadrilateroLimitsV[0] + 50;
        mangoH = cuadrilateroLimitsH[1] - 20;
        mangoV = cuadrilateroLimitsV[1];
        fresaH = cuadrilateroLimitsH[0] + 40; 
        fresaV = cuadrilateroLimitsV[1];
        obstaculo1H = cuadrilateroLimitsH[1] - 110;
        obstaculo1V = cuadrilateroLimitsV[0] + 100;
        obstaculo2H = cuadrilateroLimitsH[0] + 110; 
        obstaculo2V = cuadrilateroLimitsV[1] - 80;
    } else if(dispositive == 'Tablet' && dispositiveOrientation == 'Landscape') {
        cuadrilateroLimitsH = [-380,310];           // Límite horizontal bordes cuadrlátero
        cuadrilateroLimitsV = [-60,490];            // Límite vertical bordes cuadrlátero
        dogH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        dogV = cuadrilateroLimitsV[1];
        gusanoH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        gusanoV = 0;
        manzanaH = cuadrilateroLimitsH[1] - 10;
        manzanaV = cuadrilateroLimitsV[0] + 80;
        bananoH = cuadrilateroLimitsH[0] + 50; 
        bananoV = cuadrilateroLimitsV[0] + 80;
        mangoH = cuadrilateroLimitsH[1] - 10;
        mangoV = cuadrilateroLimitsV[1];
        fresaH = cuadrilateroLimitsH[0] + 50; 
        fresaV = cuadrilateroLimitsV[1];
        obstaculo1H = cuadrilateroLimitsH[1] - 160;
        obstaculo1V = cuadrilateroLimitsV[0] + 170;
        obstaculo2H = cuadrilateroLimitsH[0] + 190; 
        obstaculo2V = cuadrilateroLimitsV[1] - 180;
     } 
      else if(dispositive == 'Laptop' && dispositiveOrientation == 'Landscape') {
        // cuadrilateroLimitsH
        console.log("Laptop")
        const limitLeft = document.getElementById('bloquesVleft1').getBoundingClientRect();
        const limitRight = document.getElementById('bloquesVright1').getBoundingClientRect();
        const limitUp = document.getElementById('bloquesHup1').getBoundingClientRect();
        const limitDown = document.getElementById('bloquesHdown1').getBoundingClientRect();
        // Math.round((posCajaMadera.top + posCajaMadera.bottom)/2);
    
        console.log("limitLeft: " + Math.round(limitLeft.left) + " limitRight: " + Math.round(limitRight.right));
        console.log("limitUp: " + Math.round(limitUp.top9 + " limitRight: " + Math.round(limitDown.bottom));
    
        cuadrilateroLimitsH = [-450,370];           // Límite horizontal bordes cuadrlátero
        cuadrilateroLimitsV = [-70,590];            // Límite vertical bordes cuadrlátero
        dogH = -45;
        dogV = 590;
        gusanoH = -30;
        gusanoV = 0; 
        manzanaH = 340;
        manzanaV = 40;
        bananoH = -380; 
        bananoV = 40;
        mangoH = 340; 
        mangoV = 570;
        fresaH = -380; 
        fresaV = 570;
        obstaculo1H = 130; 
        obstaculo1V = 135;
        obstaculo2H = obstaculo1H - 330; 
        obstaculo2V = obstaculo1V + 260;
    }
  }

  /********************* THICKS (Métodos repetitivos) *********************/
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
    this.intervalOrientation = setInterval(() => this.tickDispositive(), 1000);
    this.intervalPosXY = setInterval(() => this.setPositionXY(), 1000);
    this.interval = setInterval(() => this.tick(), 1000);
    this.intervalGusano = setInterval(() => this.tickGusano(), 200);
  }
  componentWillUnmount() {
    clearInterval(this.intervalOrientation);
    clearInterval(this.intervalPosXY);
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
              <p className='instructions'><b>{dogname}</b> debe recolectar<br></br> todas las frutas antes que<br></br>el malvado <b>Gusanor</b> lo atrape</p>
              <table className="tablaRsultados">
                <thead>
                  <tr>
                    <td colSpan={3}><img id='cajamadera' src={cajamadera} className="App-cajamadera" alt="📦" /></td>
                  </tr>                 
                  <tr>
                    <td colSpan={3}><input type="text" id="nombre" onChange={this.campoNombre} value={this.state.nombre} placeholder="nombre" autoComplete='off'/></td>
                  </tr>
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
              <h3>Ranking</h3>
              <ListaRanking items={this.state.items} tiempo={tiempo}/>
            </div>
          </div>
        </body>
      </div>
    );
  }

  
  /********************* HELPERS (Funciones llamadas desde la interfaz gráfica *********************/
  // getRandom() {
  //   let numero = (Math.random()*400) + 1;
  //   return numero
  // }

  campoNombre(e) {
    this.setState({ nombre: e.target.value });
  }

  botonStart(e){                                          //Función para iniciar el juego
    e.preventDefault();
    this.setState(state => ({ estado: 'start' }));
    this.flechasTeclado();
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

  checkGanador() {
    posCajaMadera = document.getElementById('cajamadera').getBoundingClientRect();
    posVFrutas = Math.round((posCajaMadera.top + posCajaMadera.bottom)/2);
    const posH = 590;
    console.log("posVFrutas,posCajaMadera: " + posVFrutas,posCajaMadera);

    if((this.state.posicionHmanzana - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHmanzana + 40) &&
       (this.state.posicionVmanzana - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVmanzana + 40)
    ){
      this.setState(state => ({
          frutas: this.state.frutas + 100,
          posicionHmanzana: posH,
          posicionVmanzana: posVFrutas,
      }));
    }
    if((this.state.posicionHbanano - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHbanano + 40) &&
       (this.state.posicionVbanano - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVbanano + 40)
    ){
      this.setState(state => ({
        frutas: this.state.frutas + 100,
        posicionHbanano: posH + 60,
        posicionVbanano: posVFrutas,
      }));
    }
    if((this.state.posicionHmango - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHmango + 40) &&
       (this.state.posicionVmango - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVmango + 40)
    ){
      this.setState(state => ({
        frutas: this.state.frutas + 100,
        posicionHmango: posH + 120,
        posicionVmango: posVFrutas,
      }));
    }
    if((this.state.posicionHfresa - 40  < this.state.posicionHdog && this.state.posicionHdog < this.state.posicionHfresa + 40) &&
       (this.state.posicionVfresa - 40  < this.state.posicionVdog && this.state.posicionVdog < this.state.posicionVfresa + 40)
    ){
      this.setState(state => ({
        frutas: this.state.frutas + 100,
        posicionHfresa: posH + 180,
        posicionVfresa: posVFrutas,
      }));
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
    swalert(
      <div>
        <img src={logo} alt="logo" style={{'height':'10vmin'}} />
        <h1>{dogname} está <FontAwesomeIcon icon={faMeh} /></h1>
        <p>Lo siento {this.state.nombre}, intenta otra vez</p>
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
    }));
  }

  botonReset(e) {
    e.preventDefault();
    this.reset();
  }
  reset(){
    this.setState(state => ({
        segundos : tiempo,
        vidas : vidas,
        posicionHdog : dogH,
        posicionVdog : dogV,
        posicionHgusano : gusanoH,
        posicionVgusano : gusanoV,
        posicionHmanzana : manzanaH,
        posicionVmanzana : manzanaV, 
        posicionHbanano : bananoH, 
        posicionVbanano : bananoV, 
        posicionHmango : mangoH, 
        posicionVmango : mangoV, 
        posicionHfresa : fresaH, 
        posicionVfresa : fresaV,
        frutas : 0,
        estado : 'reset',
        nombre : '',
    }));
  }
}




export default App;