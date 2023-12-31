/* autogenerated by Processing revision 1290 on 2023-02-17 */
import processing.core.*;
import processing.data.*;
import processing.event.*;
import processing.opengl.*;

import http.requests.*;

import java.util.HashMap;
import java.util.ArrayList;
import java.io.File;
import java.io.BufferedReader;
import java.io.PrintWriter;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.IOException;

public class presionBar extends PApplet {



PImage leftPanel, rightPanel;

String baseURL =  "http://localhost:5000";

JSONObject json;


public void setup(){
    /* size commented out by preprocessor */;
    frameRate(60);
    
    background(255);
}

public void draw(){
  
    //image(rightPanel, 0, 0,rightPanel.width/4, rightPanel.height/4);

    
    String variable = "presionBar";
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
        





        

        // change color by temp
        if (tempInt < 10){
            fill(0, 0, 255);
        } else if (tempInt < 20){
            fill(0, 255, 0);
        } else if (tempInt < 30){
            fill(255, 255, 0);
        } else if (tempInt < 40){
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


  public void settings() { size(1280, 720); }

  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "presionBar" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
