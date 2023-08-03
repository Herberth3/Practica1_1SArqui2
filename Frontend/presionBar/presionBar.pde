import http.requests.*;

PImage leftPanel, rightPanel;

String baseURL =  "http://localhost:5000";

JSONObject json;


void setup(){
    size(1280,720);
    frameRate(60);
    
    background(255);
}

void draw(){
  
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
