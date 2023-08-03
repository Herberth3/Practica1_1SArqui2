#include <DHT.h>
#include <DHT_U.h>
#include <math.h>

#define tipoDHT DHT11
int pinDHT = 7;
DHT HT(pinDHT, tipoDHT);

int humedadR;
float humedadA;
float temperaturaC;
float puntoR;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  HT.begin();
}

void loop() {
  humedadR = HT.readHumidity();
  temperaturaC = HT.readTemperature();

  Serial.print("Humedad Relativa: ");
  Serial.print(humedadR);
  Serial.print(" % / Temperatura: ");
  Serial.print(temperaturaC);
  Serial.print(" C / ");
  Serial.print("Humedad absoluta: ");
  Serial.print(humedadAbsoluta());
  Serial.print(" g/m^3 / ");
  Serial.print("Punto de Rocio: ");
  Serial.print(puntoRocio());
  Serial.println(" C");
  delay(6000);
}

float humedadAbsoluta(){
  //Presión de vapor de saturación a partir de la temperatura en Celcius
  float presionA = 611 * exp((17.27 * temperaturaC)/(237.3 + temperaturaC));
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

float puntoRocio(){
  float number = humedadR/100.0;
  float alpha = log(number) + ((17.625 * temperaturaC) / (243.04 + temperaturaC));
  puntoR = (243.04 * alpha) / (17.625 - alpha);
  return puntoR;
}