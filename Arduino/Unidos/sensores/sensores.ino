#include <DHT.h>
#include <DHT_U.h>
#include <math.h>
#include <SFE_BMP180.h>
#include <Wire.h>

//********************VARIABLES TEMPERATURA Y HUMEDAD *********************************
#define tipoDHT DHT11
int pinDHT = 7;
DHT HT(pinDHT, tipoDHT);

int humedadR;
float humedadA;
float temperaturaC;
float puntoR;

//*****************VARIABLES ANEMOMETRO *******************************************
float veloc1 = 0;
int tiempo = 0;
int ent = 0;
float v1 = 0;
float v2 = 0;

//****************VARIABLES DIRECCION AIRE ************************************
const int norte = 6;
const int sur = 4;
const int este = 3;
const int oeste = 5;
int leerN, leerS, leerE, leerO = 0;
//int cambio = false;
String actual = "";

//************* VARIABLES BAROMETRO *******************************************
char status;
double tem, presion;
SFE_BMP180 sensorPresion;

//***********IMPRESIONES********
float stemp = 0;
int hrel = 0;
float habs = 0;
float veloc = 0;
String dirv = "";
double pres = 0;
float ptor = 0;

void setup() {
  Serial.begin(9600);

  //Temperatura y humedad
  HT.begin();

  //Barómetro
  sensorPresion.begin();

  //Dirección del viento
  pinMode(norte, INPUT);
  pinMode(sur, INPUT);
  pinMode(este, INPUT);
  pinMode(oeste, INPUT);
}

void loop() {
  //Barómetro
  ObtenerPresion();
  
  //Dirección del viento
  ObtenerDir();

  // Anemómetro
  ObtenerV();

  //Temperatura y humedad
  ObtenerTH();

  //Serial.println("\n");
  Serial.println(String(stemp)+","+String(hrel)+","+String(habs)+","+String(veloc)+","+String(dirv)+","+String(pres)+","+String(ptor));
}

void ObtenerPresion() {
  status = sensorPresion.startTemperature();
  //delay(status);

  sensorPresion.getTemperature(tem);
  status = sensorPresion.startPressure(3);
  //delay(status);

  sensorPresion.getPressure(presion, tem);
  pres = (presion * 0.1) * 7.50062;
  //Serial.print("-> Presion Atmosferica: ");
  //Serial.print(presion * 0.1, 2);
  //Serial.print(" KPa / ");
  //Serial.print((presion * 0.1) * 7.50062, 2);
  //Serial.println(" mmHg");
  // Para convertirlo se debe de multiplicar
  // 1KPa = 7.50062 mmHg
}

void ObtenerTH() {
  humedadR = HT.readHumidity();
  temperaturaC = HT.readTemperature();

  /*Serial.print("-> Humedad Relativa: ");
  Serial.print(humedadR);
  Serial.print(" % / Temperatura: ");
  Serial.print(temperaturaC);
  Serial.print(" C / ");
  Serial.print("Humedad absoluta: ");
  Serial.print(humedadAbsoluta());
  Serial.print(" g/m^3 / ");
  Serial.print("Punto de Rocio: ");
  Serial.print(puntoRocio());
  Serial.println(" C");*/
  humedadA = humedadAbsoluta();
  ptor = puntoRocio();
  stemp = temperaturaC;
  hrel = humedadR;
  habs = humedadA;
  delay(6000);
}

void ObtenerDir() {
  leerN = digitalRead(norte);
  leerS = digitalRead(sur);
  leerO = digitalRead(oeste);
  leerE = digitalRead(este);

  direccionViento();
}

void ObtenerV() {
  v1 = (analogRead(A3));
  veloc1 = (v1 + 0.190);
  if (veloc1 == 0.190) {
    veloc1 = 0;
  }
  veloc = veloc1;
}

float humedadAbsoluta() {
  //Presión de vapor de saturación a partir de la temperatura en Celcius
  float presionA = 611 * exp((17.27 * temperaturaC) / (237.3 + temperaturaC));
  //Presión de vapor a partir de la presión de vapor de saturación y la humedad relativa
  float presion = (humedadR * presionA) / 100;
  //Temperatura en Celcius a Kelvin
  float temperaturaK = temperaturaC + 273.15;
  //Cálculo de la humedad absoluta en kg/m^3
  humedadA = presion / (temperaturaK * 461.5);
  //Cálculo de la humedad absoluta en k/m^3
  humedadA = humedadA * 1000;
  return humedadA;
}

float puntoRocio() {
  float number = humedadR / 100.0;
  float alpha = log(number) + ((17.625 * temperaturaC) / (243.04 + temperaturaC));
  puntoR = (243.04 * alpha) / (17.625 - alpha);
  return puntoR;
}

int direccionViento() {

  if (leerN == 1 && leerS == 1 && leerE == 1 && leerO == 1) {
    //Serial.print("Dirección del viento: ");
    //Serial.println(actual);
    dirv = actual;
  } else {
    if (leerN == 0) {
      actual = "Norte";
    } else if (leerS == 0) {
      actual = "Sur";
    } else if (leerO == 0) {
      actual = "Oeste";
    } else if (leerE == 0) {
      actual = "Este";
    }
    //Serial.print("-> Dirección del viento: ");
    //Serial.println(actual);
    dirv = actual;
  }

}
