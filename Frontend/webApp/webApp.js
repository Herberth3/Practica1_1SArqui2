/*Es requerida la app js serialcontrol para permitir al navegador acceder a los puertos de nuestra computadora*/

/*IMAGENES*/

let imgTemperatura;
let imgHumedadRel;
let imgHumedadAbs;
let imgVelocidadViento;
let imgDireccionViento;
let imgPresionBar;

let splitData;

/*FUENTES*/
let robotoSlabLight;
let robotoSlabRegular;

/*LECTURAS RECIBIDAS DEL ARDUINO*/
let temperatura;
let humedadRel;
let humedadAbs;
let velocidadViento;
let direccionViento;
let presionBar;

let portName="COM2";

let serial;
let latestData = "0,0,0,0,0,0";

function preload() {
  imgTemperatura = loadImage('assets/temperature.png');
  imgHumedadRel  = loadImage('assets/humidity1.png');
  imgHumedadAbs  = loadImage('assets/humidity2.png');
  imgVelocidadViento = loadImage('assets/viento.png');
  imgDireccionViento = loadImage('assets/direction.png');
  imgPresionBar = loadImage('assets/pressure.png');
  
  
  robotoSlabLight = loadFont('data/RobotoSlabLight.ttf');
  robotoSlabRegular = loadFont('data/RobotoSlabRegular.ttf');
  
}

function setup() {
  
 splitData = split(latestData, ',');
 temperatura=splitData[0];
 humedadRel=splitData[1];
 humedadAbs=splitData[2];
 velocidadViento=splitData[3];
 direccionViento=splitData[4];
 presionBar=splitData[5];

  
  serial = new p5.SerialPort(); //Instancia de serialport que estaremos utilizando
  serial.list(); //Imprimiendo los puertos disponibles por cuestiones de desarrollo
  serial.open(portName); //CAMBIAR EL PUERTO SERIAL AL QUE SE ESTÉ UTILIZANDO ACTUALMENTE
  
  //Llamadas a métodos propios de la librería para verificar la conexión
  serial.on('connected', serverConnected);
  serial.on('list', gotList);
  serial.on('open', gotOpen);
  serial.on('close', gotClose);
  serial.onData(gotData);
  
  
  print(serial.isConnected());
  
  createCanvas(1322,624); //Tamaño del lienzo
  
  
  frameRate(1); //Frames por segundo
  background(101,204,250);
  
  //Dibujo el cuadrado más grande
  stroke(255); // Trazado blanco
  strokeWeight(5);//Grosor de la linea
  fill(255); //Relleno blanco
  rect(40, 40, 1242, 554);
  
  //Dibujo el rectángulo de la izquierda
  stroke(230,235,237);
  
  fill(255);
  rect(40,40,400,554);
  
  /*********************************************************************************************************************************************/
  image(imgTemperatura,180,80,150,150);
  
  /*Texto de temperatura*/
  textFont(robotoSlabRegular);
  textSize(32);
  noStroke();
  fill(0);
  text('Temperatura',150,260);
  
  /*Lectura de la temperatura*/

  textFont(robotoSlabLight);
  textSize(30);
  noStroke();
  fill(0);
  text(temperatura,210,300,50,50);
  
  //Simbolo de C°
  text("C°",261,300);
  
  /*Texto de identificación del grupo*/
  textSize(12);
  text("© Grupo 5 - Arquitectura de Computadores y Ensalmbladores 2\nPrimer sementre 2023",45,570);
  
  //Dibujo el rectángulo de la derecha
  stroke(230,235,237);
  fill(255);
  rect(440,40,842,554);
  /*********************************************************************************************************************************************************************/
  /*Humedad relativa*/
  image(imgHumedadRel,500,80,100,100);
  
  /*Texto de Humedad relativa*/
  textFont(robotoSlabRegular);
  textSize(25);
  noStroke();
  fill(0);
  text('Humedad Relativa',450,260);
  
  /*Lectura de la humedad relativa*/

  textFont(robotoSlabLight);
  textSize(30);
  noStroke();
  fill(0);
  text(humedadRel,520,300,50,50);
  
  //Simbolo de C°
  text("C°",570,300);
  
  /*******************************************************************************************************************************************************************/
   /*Humedad absoluta*/
  image(imgHumedadAbs,735,80,150,100);
  
  /*Texto de Humedad Absoluta*/
  textFont(robotoSlabRegular);
  textSize(25);
  noStroke();
  fill(0);
  text('Humedad Absoluta',700,260);
  
  /*Lectura de la humedad absoluta*/
  
  textFont(robotoSlabLight);
  textSize(30);
  noStroke();
  fill(0);
  text(humedadAbs,740,300,50,50);
  
  //Simbolo de g/m^3
  text("g/m^3",800,300);
  
  /*******************************************************************************************************************************************************************/
   /*Velocidad del viento*/
  image(imgVelocidadViento,1000,70,150,150);
  
  /*Texto de velocidad del viento*/
  textFont(robotoSlabRegular);
  textSize(25);
  noStroke();
  fill(0);
  text('Velocidad del viento',965,260);
  
  /*Lectura de la velocidad del viento*/
  
  textFont(robotoSlabLight);
  textSize(30);
  noStroke();
  fill(0);
  text(velocidadViento,1005,300,50,50);
  
  //Simbolo de km/h
  text("km/h",1065,300);
  
  /********************************************************************************************************************************************************************/
  /*Direccion del viento*/
  image(imgDireccionViento,620,350,100,100);
  
  /*Texto de Direccion del viento*/
  textFont(robotoSlabRegular);
  textSize(25);
  noStroke();
  fill(0);
  text('Direccion del Viento',560,490);
  
  /*Lectura de la direccion del viento*/

  textFont(robotoSlabLight);
  textSize(30);
  noStroke();
  fill(0);
  text(direccionViento,660,530,50,50);
  
  //Simbolo de C°
//  text("C°",570,300);
  
  /**********************************************************************************************************************************************************************/
  image(imgPresionBar,910,350,100,100);
  
  /*Texto de Presión Barométrica*/
  textFont(robotoSlabRegular);
  textSize(25);
  noStroke();
  fill(0);
  text('Presión Barométrica',850,490);
  
  /*Lectura de la presión barométrica*/
  
  textFont(robotoSlabLight);
  textSize(30);
  noStroke();
  fill(0);
  text(presionBar,890,530,50,50);
  
  //Simbolo de mmHg
  text("mmHg°",970,530);
  
}

function draw() {
  
  
  
 splitData = split(latestData, ',');
 temperatura=splitData[0];
 humedadRel=splitData[1];
 humedadAbs=splitData[2];
 velocidadViento=splitData[3];
 direccionViento=splitData[4];
 presionBar=splitData[5];
 
 
   background(101,204,250);
  
  //Dibujo el cuadrado más grande
  stroke(255); // Trazado blanco
  strokeWeight(5);//Grosor de la linea
  fill(255); //Relleno blanco
  rect(40, 40, 1242, 554);
  
  //Dibujo el rectángulo de la izquierda
  stroke(230,235,237);
  
  fill(255);
  rect(40,40,400,554);
  
  /*********************************************************************************************************************************************/
  image(imgTemperatura,180,80,150,150);
  
  /*Texto de temperatura*/
  textFont(robotoSlabRegular);
  textSize(32);
  noStroke();
  fill(0);
  text('Temperatura',150,260);
  
  /*Lectura de la temperatura*/
 
  textFont(robotoSlabLight);
  textSize(30);
  noStroke();
  fill(0);
  text(temperatura,210,300,50,50);
  
  //Simbolo de C°
  text("C°",261,300);
  
  /*Texto de identificación del grupo*/
  textSize(12);
  text("© Grupo 5 - Arquitectura de Computadores y Ensalmbladores 2\nPrimer sementre 2023",45,570);
  
  //Dibujo el rectángulo de la derecha
  stroke(230,235,237);
  fill(255);
  rect(440,40,842,554);
  /*********************************************************************************************************************************************************************/
  /*Humedad relativa*/
  image(imgHumedadRel,500,80,100,100);
  
  /*Texto de Humedad relativa*/
  textFont(robotoSlabRegular);
  textSize(25);
  noStroke();
  fill(0);
  text('Humedad Relativa',450,260);
  
  /*Lectura de la humedad relativa*/

  textFont(robotoSlabLight);
  textSize(30);
  noStroke();
  fill(0);
  text(humedadRel,520,300,50,50);
  
  //Simbolo de C°
  text("C°",570,300);
  
  /*******************************************************************************************************************************************************************/
   /*Humedad absoluta*/
  image(imgHumedadAbs,735,80,150,100);
  
  /*Texto de Humedad Absoluta*/
  textFont(robotoSlabRegular);
  textSize(25);
  noStroke();
  fill(0);
  text('Humedad Absoluta',700,260);
  
  /*Lectura de la humedad absoluta*/
  
  textFont(robotoSlabLight);
  textSize(30);
  noStroke();
  fill(0);
  text(humedadAbs,740,300,50,50);
  
  //Simbolo de g/m^3
  text("g/m^3",800,300);
  
  /*******************************************************************************************************************************************************************/
   /*Velocidad del viento*/
  image(imgVelocidadViento,1000,70,150,150);
  
  /*Texto de velocidad del viento*/
  textFont(robotoSlabRegular);
  textSize(25);
  noStroke();
  fill(0);
  text('Velocidad del viento',965,260);
  
  /*Lectura de la velocidad del viento*/
  
  textFont(robotoSlabLight);
  textSize(30);
  noStroke();
  fill(0);
  text(velocidadViento,1005,300,50,50);
  
  //Simbolo de km/h
  text("km/h",1065,300);
  
  /********************************************************************************************************************************************************************/
  /*Direccion del viento*/
  image(imgDireccionViento,620,350,100,100);
  
  /*Texto de Direccion del viento*/
  textFont(robotoSlabRegular);
  textSize(25);
  noStroke();
  fill(0);
  text('Direccion del Viento',560,490);
  
  /*Lectura de la direccion del viento*/
  
  textFont(robotoSlabLight);
  textSize(30);
  noStroke();
  fill(0);
  text(direccionViento,660,530,50,50);
  
  //Simbolo de C°
//  text("C°",570,300);
  
  /**********************************************************************************************************************************************************************/
  image(imgPresionBar,910,350,100,100);
  
  /*Texto de Presión Barométrica*/
  textFont(robotoSlabRegular);
  textSize(25);
  noStroke();
  fill(0);
  text('Presión Barométrica',850,490);
  
  /*Lectura de la presión barométrica*/
  
  textFont(robotoSlabLight);
  textSize(30);
  noStroke();
  fill(0);
  text(presionBar,890,530,50,50);
  
  //Simbolo de mmHg
  text("mmHg°",970,530);
  console.log(latestData);
  
}


// Following functions print the serial communication status to the console for debugging purposes

function serverConnected() {
  print("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  print("List of Serial Ports:");
  // theList is an array of their names
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is Open");
}

function gotClose(){
    print("Serial Port is Closed");
    latestData = "Serial Port is Closed";
}

//print error to console
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  let currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString){ latestData="0,0,0,0,0,0";}             // if the string is empty, do no more
  console.log(currentString);             // print the string
  latestData = currentString;            // save it for the draw method
}

// We got raw from the serial port
function gotRawData(thedata) {
  print("gotRawData" + thedata);
}
