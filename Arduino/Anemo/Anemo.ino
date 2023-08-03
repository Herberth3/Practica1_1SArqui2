
 float veloc1 = 0;
  int tiempo = 0;
  int ent = 0;
  float v1 = 0;
  float v2 = 0;
  void setup() {
    Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  v1 = (analogRead(A3));
  veloc1 = (v1+0.190);
  if(veloc1 == 0.190){
    veloc1 = 0;
  }
  Serial.print("Velocidad: ");
  Serial.print(veloc1);
  Serial.println(" km/h");

  Serial.print("Velocidad MAX: ");
  Serial.print(v2);
  Serial.println(" km/h");

  if(veloc1 > v2){
    v2 = v1;

  }
  delay(5000);
}
