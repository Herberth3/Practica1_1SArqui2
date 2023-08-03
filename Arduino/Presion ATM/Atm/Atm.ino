#include <SFE_BMP180.h>
#include <Wire.h>

char status;
double tem,presion;


SFE_BMP180 sensorPresion;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  sensorPresion.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
status = sensorPresion.startTemperature();
delay(status);

sensorPresion.getTemperature(tem);
status = sensorPresion.startPressure(3);
delay(status);

sensorPresion.getPressure(presion,tem);
Serial.print("Presion Atmosferica: ");
Serial.print(presion*0.1,2);
Serial.println(" KPa");
Serial.print((presion*0.1)*7.50062,2);
Serial.println(" mmHg");
// Para convertirlo se debe de multiplicar 
// 1KPa = 7.50062 mmHg


delay(5000);
}
