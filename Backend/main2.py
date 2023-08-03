import serial

#Prueba para la comunicacion serial
ser = serial.Serial(port='COM2', baudrate=9600, timeout=1, write_timeout=1)

if __name__ == '__main__':
    while True:
        
        try:
            saludo = ser.readline()
            print (saludo)
    
               
        except:
            print("Exception occurred, somthing wrong...")

    ser.close()