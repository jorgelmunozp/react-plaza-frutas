function setPositionXY({
        dispositiveOrientation,
        dispositive,
        cellphoneSize,
        tabletSize,
        cuadrilateroLimitsH,cuadrilateroLimitsV,
        dogH,dogV,
        gusanoH,gusanoV,
        manzanaH,manzanaV,
        bananoH,bananoV,
        mangoH,mangoV,fresaH,fresaV,
        obstaculo1H,obstaculo1V,
        obstaculo2H,obstaculo2V
    }) {
    console.log("setPositionXY... " );
    let windowWidth = document.documentElement.clientWidth;       // Tamaño horizontal de pantalla
    let windowHeight = document.documentElement.clientHeight;     // Tamaño vertical de pantalla
    if (windowWidth > windowHeight) {          
        dispositiveOrientation = 'Landscape';                          // Orientación del dispositivo horizontal
        if (windowWidth <= cellphoneSize[1]) { dispositive = 'Cell' }       // Tipo de dispositivo Pc, Tablet o Celular
        else if (cellphoneSize[1] < windowWidth && windowWidth <= tabletSize[1]) { dispositive = 'Tablet' }
        else if (windowWidth > tabletSize[1]) { dispositive = 'Laptop' }
    } else if ( windowHeight > windowWidth) { 
        dispositiveOrientation = 'Portrait';                           // Orientación del dispositivo vertical
        if (windowHeight <= cellphoneSize[1]) { dispositive = 'Cell' }      // Tipo de dispositivo Pc, Tablet o Celular
        else if (cellphoneSize[1] < windowHeight && windowHeight <= tabletSize[1]) { dispositive = 'Tablet' }
        else if (windowHeight > tabletSize[1]) { dispositive = 'Laptop' }
    }

    const limitLeft = document.getElementById('bloquesVleft').offsetLeft;  // Limites de movimiento dentro del cuadrilatero
    const limitRight = document.getElementById('bloquesVright').offsetLeft;
    const limitUp = document.getElementById('bloquesHup').offsetTop;
    const limitDown = document.getElementById('bloquesHdown').offsetTop;   
    const limitWidth = document.getElementById('bloquesVleft').offsetWidth;   
    const limitHeigth = document.getElementById('bloquesVleft').offsetWidth; 

    // Orientación Portrait para Celular | Tablet | Laptop
    if(dispositive === 'Cell' && dispositiveOrientation === 'Portrait') {
        cuadrilateroLimitsH = [limitLeft + limitWidth, limitRight - limitWidth];   // Límite horizontal bordes cuadrilatero
        cuadrilateroLimitsV = [limitUp, limitDown - limitWidth];            // Límite vertical bordes cuadrilatero
        console.log("limits H:" + cuadrilateroLimitsH)
        console.log("limits V:" + cuadrilateroLimitsV)
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
        cuadrilateroLimitsH = [limitLeft + limitWidth, limitRight - limitWidth];   // Límite horizontal bordes cuadrilatero
        cuadrilateroLimitsV = [limitUp, limitDown - limitWidth];            // Límite vertical bordes cuadrilatero
        // const offset = this.getRandom();
        console.log("offset: ", this.offset)
        
        dogH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        dogV = cuadrilateroLimitsV[1];
        gusanoH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        gusanoV = 0;
        manzanaH = cuadrilateroLimitsH[1] - 20; 
        // console.log("manzanaH: ",manzanaH)
        manzanaV = cuadrilateroLimitsV[0] + 50;
        bananoH = cuadrilateroLimitsH[0] + 40; 
        bananoV = cuadrilateroLimitsV[0] + 50;
        mangoH = cuadrilateroLimitsH[1] - 20;
        mangoV = cuadrilateroLimitsV[1];
        fresaH = cuadrilateroLimitsH[0] + 40; 
        fresaV = cuadrilateroLimitsV[1];
        obstaculo1H = cuadrilateroLimitsH[1] - 110;
        obstaculo1V = cuadrilateroLimitsV[0] + 100;
        obstaculo2H = cuadrilateroLimitsH[0] + 60; 
        obstaculo2V = cuadrilateroLimitsV[1] - 80;
    } else if(dispositive === 'Tablet' && dispositiveOrientation === 'Landscape') {
        cuadrilateroLimitsH = [limitLeft + limitWidth, limitRight - limitWidth];   // Límite horizontal bordes cuadrilatero
        cuadrilateroLimitsV = [limitUp, limitDown - limitWidth];            // Límite vertical bordes cuadrilatero
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
      else if(dispositive === 'Laptop' && dispositiveOrientation === 'Landscape') {
        cuadrilateroLimitsH = [limitLeft + limitWidth, limitRight - limitWidth];   // Límite horizontal bordes cuadrilatero
        cuadrilateroLimitsV = [limitUp, limitDown - limitWidth];            // Límite vertical bordes cuadrilatero
        dogH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        dogV = cuadrilateroLimitsV[1];
        gusanoH = (cuadrilateroLimitsH[1] + cuadrilateroLimitsH[0])/2;
        gusanoV = 0; 
        manzanaH = cuadrilateroLimitsH[1];
        manzanaV = cuadrilateroLimitsV[0] + 350;
        bananoH = cuadrilateroLimitsH[0] + 180;
        bananoV = cuadrilateroLimitsV[0] + 350;
        mangoH = cuadrilateroLimitsH[1]; 
        mangoV = cuadrilateroLimitsV[1];
        fresaH = cuadrilateroLimitsH[0] + 180;
        fresaV = cuadrilateroLimitsV[1];
        obstaculo1H = 130; 
        obstaculo1V = 135;
        obstaculo2H = obstaculo1H - 330; 
        obstaculo2V = obstaculo1V + 260;
    }
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
  }

  export default setPositionXY;