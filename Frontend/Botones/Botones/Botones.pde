int value = 0;
PImage imgTemperatura,imgHumedadRel,imgHumedadAbs, imgVelocidadViento, imgDireccionViento, imgPresion, imgRocio;

import http.requests.*;

PImage leftPanel, rightPanel;

String baseURL =  "http://localhost:5000";

JSONObject json;


void setup(){
  size(1300,700);
  background(#6AABFF);
  frameRate(2);
  imgTemperatura=loadImage("assets/temperature.png");
  imgHumedadRel=loadImage("assets/humidity1.png");
  imgHumedadAbs=loadImage("assets/humidity2.png");
  imgVelocidadViento=loadImage("assets/viento.png");
  imgDireccionViento=loadImage("assets/direction.png");
  imgPresion=loadImage("assets/pressure.png");
  imgRocio=loadImage("assets/snowflake.png");
}


void draw() {
  background(#6AABFF); //Se pone otra vez para cubrir lo que había antes
  image(imgTemperatura,50,50,150,150);
  textSize(30);
  fill(0);
  text("Presiona (t)\nTemperatura",45,225);
  
  image(imgHumedadRel,500,50,150,150);
  text("Presiona (r)\nHumedad Relativa",500,225);
  
  image(imgHumedadAbs,1000,50,230,150);
  text("Presiona (a)\nHumedad Absoluta",1000,225);
  
  image(imgVelocidadViento,50,350,150,150);
  text("Presiona (v)\nVelovidad del Viento",45,555);
  
  image(imgDireccionViento,500,350,150,150);
  text("Presiona (d)\nDirección del Viento",500,555);
  
  image(imgPresion,1000,350,150,150);
  text("Presiona (p)\nPresión barométrica",1000,555);
}

void keyPressed(){
  if(key=='t'||key=='T'){
    graficaTemperatura();
  }
  else if(key=='r' || key=='R'){
    graficaHumedadRel();
  }
  else if(key=='a' || key=='A'){
    graficaHumedadA();
  }
  else if(key=='v' || key=='V'){
    graficaVelocidadV();
  }
  else if(key=='d' || key=='D'){
    graficaDireccionV();
  }
  else if(key=='p' || key=='P'){
    graficaPresion();
  }
}

void graficaTemperatura(){
  background(#6AABFF);
  print("Hola");
  //Consultar aquí la temperatura y graficarla como Diosito nos ayude
}

void graficaHumedadRel(){
  background(#6AABFF);
  String variable = "direccionV";
    String url_temp = "/"+variable;
    GetRequest get = new GetRequest(baseURL + url_temp);
    get.send();
    
    JSONObject response = parseJSONObject(get.getContent());
        
    int altura =2;
    
    int vals_group = response.size() / 10;

    
    for (int i = 0; i<response.size(); i++){
        json = new JSONObject();
        json = response.getJSONObject(Integer.toString(i));
        
        String date = json.getString("fecha");
        String temp = json.getString(variable);
        
        //fill colour based on temp
        //convert string to int
        int tempInt = PApplet.parseInt(temp);
        
        //make an spiral with the temp 
        int x = 100 + (int) (Math.cos(altura) * altura + width/3);
        int y = 100 + (int) (Math.sin(altura) * altura + height/3);
        altura += 1;
        
        //make a ellipse with the temp
        


        print(temp.equals("Este"));


        

        // change color by temp
        if (temp.equals("Este")){
            fill(0, 0, 255);
        } else if (temp.equals("Oeste")){
            fill(0, 255, 0);
        } else if (temp.equals("Norte")){
            fill(255, 255, 0);
        } else if (temp.equals("Sur")){
            fill(255, 165, 0);
        } else {
            fill(255, 0, 0);
        }

        ellipse(x, y, 10, 10);

        fill(0);
        if(i%10 ==0 || i==0 || i==response.size()-1){
          text(date, x, y);
          
          text(temp, x, y+10);
        }
    }
  
  
}
void graficaHumedadA(){
  background(#6AABFF);
}

void graficaVelocidadV(){
  background(#6AABFF);
}

void graficaDireccionV(){
  background(#6AABFF);
}
void graficaPresion(){
  background(#6AABFF);
}
