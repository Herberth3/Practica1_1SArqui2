/*Es requerida la app js serialcontrol para permitir al navegador acceder a los puertos de nuestra computadora*/

/*IMAGENES*/

let imgTemperatura;
let imgHumedadRel;
let imgHumedadAbs;
let imgVelocidadViento;
let imgDireccionViento;
let imgPresionBar;
let imgPunto;

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
let punto;

let portName="COM3";

let serial;
let latestData = "0,0,0,0,0,0,0";

let url="http://localhost:5000/post"; //Url para poder hacer post al servidor

function preload() {
  imgTemperatura = loadImage('/static/js/assets/temperature.png');
  imgHumedadRel  = loadImage('/static/js/assets/humidity1.png');
  imgHumedadAbs  = loadImage('/static/js/assets/humidity2.png');
  imgVelocidadViento = loadImage('/static/js/assets/viento.png');
  imgDireccionViento = loadImage('/static/js/assets/direction.png');
  imgPresionBar = loadImage('/static/js/assets/pressure.png');
  imgRocio = loadImage('/static/js/assets/snowflake.png')
  
  
  robotoSlabLight = loadFont('/static/js/data/RobotoSlabLight.ttf');
  robotoSlabRegular = loadFont('/static/js/data/RobotoSlabRegular.ttf');
  
}

function setup() {
  
  splitData = split(latestData, ',');
  temperatura=splitData[0];
  humedadRel=splitData[1];
  humedadAbs=splitData[2];
  velocidadViento=splitData[3];
  direccionViento=splitData[4];
  presionBar=splitData[5];
  rocio=splitData[6];
 
   
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
   image(imgHumedadRel,550,80,100,100);
   
   /*Texto de Humedad relativa*/
   textFont(robotoSlabRegular);
   textSize(25);
   noStroke();
   fill(0);
   text('Humedad Relativa',550  ,260);
   
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
   image(imgDireccionViento,500,350,100,100);
   
   /*Texto de Direccion del viento*/
   textFont(robotoSlabRegular);
   textSize(25);
   noStroke();
   fill(0);
   text('Direccion del Viento',445,490);
   
   /*Lectura de la direccion del viento*/
 
   textFont(robotoSlabLight);
   textSize(30);
   noStroke();
   fill(0);
   text(direccionViento,540,530,50,50);
   
   //Simbolo de C°
 //  text("C°",570,300);
   
   /**********************************************************************************************************************************************************************/
   image(imgPresionBar,775,350,100,100);
   
   /*Texto de Presión Barométrica*/
   textFont(robotoSlabRegular);
   textSize(25);
   noStroke();
   fill(0);
   text('Presión Barométrica',715,490);
   
   /*Lectura de la presión barométrica*/
   
   textFont(robotoSlabLight);
   textSize(30);
   noStroke();
   fill(0);
   text(presionBar,755,530,50,50);
   
   //Simbolo de mmHg
   text("mmHg",835,530);
   
   /************************************************************************************************************************************************************************/
   image(imgRocio,1040,350,100,100);
   
   /*Texto de Presión Barométrica*/
   textFont(robotoSlabRegular);
   textSize(25);
   noStroke();
   fill(0);
   text('Punto de rocío',1010,490);
   
   /*Lectura de la presión barométrica*/
   
   textFont(robotoSlabLight);
   textSize(30);
   noStroke();
   fill(0);
   text(rocio,1030,530,50,50);
   
   //Simbolo de mmHg
   text("gr/m^3°",1090,530);
   /*
   url="http://localhost:5000/post/4/3/9/1/2/3";
   httpPost(
     url,
     'text',
     'no-cors',
     function(result) {
       // ... won't be called
     },
     function(error) {
       strokeWeight(2);
       text(error.toString(), mouseX, mouseY);
     }
   );
   */
   
 }
 
 function draw() {
   
   
   
  splitData = split(latestData, ',');
  temperatura=splitData[0];
  humedadRel=splitData[1];
  humedadAbs=splitData[2];
  velocidadViento=splitData[3];
  direccionViento=splitData[4];
  presionBar=splitData[5];
  rocio=splitData[6];
  
  
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
   image(imgTemperatura,180,200,150,150);
   
   /*Texto de temperatura*/
   textFont(robotoSlabRegular);
   textSize(32);
   noStroke();
   fill(0);
   text('Temperatura',150,375);
   
   /*Lectura de la temperatura*/
  
   textFont(robotoSlabLight);
   textSize(30);
   noStroke();
   fill(0);
   text(temperatura,190,425,50,50);
   
   //Simbolo de C°
   text("C°",271,425);
   
   /*Texto de identificación del grupo*/
   textSize(12);
   text("© Grupo 5 - Arquitectura de Computadores y Ensalmbladores 2\nPrimer sementre 2023",45,570);
   
   //Dibujo el rectángulo de la derecha
   stroke(230,235,237);
   fill(255);
   rect(440,40,842,554);
   /*********************************************************************************************************************************************************************/
   /*Humedad relativa*/
   image(imgHumedadRel,560,80,100,100);
   
   /*Texto de Humedad relativa*/
   textFont(robotoSlabRegular);
   textSize(25);
   noStroke();
   fill(0);
   text('Humedad Relativa',500,260);
   
   /*Lectura de la humedad relativa*/
 
   textFont(robotoSlabLight);
   textSize(30);
   noStroke();
   fill(0);
   text(humedadRel,590,300,50,50);
   
   //Simbolo de %
   text("%",635,300);
   
   /*******************************************************************************************************************************************************************/
    /*Humedad absoluta*/
   image(imgHumedadAbs,800,80,150,100);
   
   /*Texto de Humedad Absoluta*/
   textFont(robotoSlabRegular);
   textSize(25);
   noStroke();
   fill(0);
   text('Humedad Absoluta',775,260);
   
   /*Lectura de la humedad absoluta*/
   
   textFont(robotoSlabLight);
   textSize(30);
   noStroke();
   fill(0);
   text(humedadAbs,815,300,50,50);
   
   //Simbolo de g/m^3
   text("g/m^3",895,300);
   
   /*******************************************************************************************************************************************************************/
    /*Velocidad del viento*/
   image(imgVelocidadViento,1075,70,150,150);
   
   /*Texto de velocidad del viento*/
   textFont(robotoSlabRegular);
   textSize(25);
   noStroke();
   fill(0);
   text('Velocidad Viento',1050,260);
   
   /*Lectura de la velocidad del viento*/
   
   textFont(robotoSlabLight);
   textSize(30);
   noStroke();
   fill(0);
   text(velocidadViento,1075,300,50,50);
   
   //Simbolo de km/h
   text("km/h",1155,300);
   
   /********************************************************************************************************************************************************************/
   /*Direccion del viento*/
   image(imgDireccionViento,560,350,100,100);
   
   /*Texto de Direccion del viento*/
   textFont(robotoSlabRegular);
   textSize(25);
   noStroke();
   fill(0);
   text('Direccion del Viento',490,515);
   
   /*Lectura de la direccion del viento*/
 
   textFont(robotoSlabLight);
   textSize(30);
   noStroke();
   fill(0);
   text(direccionViento,555 ,550,50,50);
   
   //Simbolo de C°
 //  text("C°",570,300);
   
   /**********************************************************************************************************************************************************************/
   image(imgPresionBar,825,350,100,100);
   
   /*Texto de Presión Barométrica*/
   textFont(robotoSlabRegular);
   textSize(25);
   noStroke();
   fill(0);
   text('Presión Barométrica',765,515);
   
   /*Lectura de la presión barométrica*/
   
   textFont(robotoSlabLight);
   textSize(30);
   noStroke();
   fill(0);
   text(presionBar,790,550,50,50);
   
   //Simbolo de mmHg
   text("mmHg",890,550);
   
   /***************************************************************************************************************************************************************************/
   image(imgRocio,1100,350,100,100);
   
   /*Texto de Presión Barométrica*/
   textFont(robotoSlabRegular);
   textSize(25);
   noStroke();
   fill(0);
   text('Punto de Rocío',1060,515);
   
   /*Lectura de la presión barométrica*/
   
   textFont(robotoSlabLight);
   textSize(30);
   noStroke();
   fill(0);
   text(rocio,1100,550,50,50);
   
   //Simbolo de mmHg
   text("C°",1180,550);
   
   url=url+"/"+temperatura+"/"+humedadRel+"/"+humedadAbs+"/"+velocidadViento+"/"+direccionViento+"/"+presionBar+"/"+rocio;
   console.log(url);
  
  httpPost(
  
     url,
     'text',
     'no-cors',
     function(result) {
       // ... won't be called
     },
     function(error) {
       strokeWeight(2);
       //text(error.toString(), mouseX, mouseY);
     }
   
   )
   
   url="http://localhost:5000/post"
   
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
   if (!currentString){ latestData="0,0,0,0,0,0,0";}             // if the string is empty, do no more
   console.log(currentString);             // print the string
   latestData = currentString;            // save it for the draw method
 }
 
 // We got raw from the serial port
 function gotRawData(thedata) {
   print("gotRawData" + thedata);
 }